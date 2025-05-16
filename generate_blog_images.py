import os
import csv
import io
import base64
import time
import logging
import zipfile
import requests
import sys
import json
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
import argparse
import signal
import re
import traceback

import openai
from dotenv import load_dotenv
from tqdm import tqdm
from PIL import Image
from openai import OpenAI
from openai import RateLimitError, APIError

# ---------------------------------------------------------------------------
# Signal handler for graceful shutdown
# ---------------------------------------------------------------------------
def signal_handler(signum, frame):
    print("\n⚠️  Gracefully shutting down... Please wait for current operation to complete.")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

# ---------------------------------------------------------------------------
# generate_blog_images.py
# ---------------------------------------------------------------------------
# A script to generate blog hero images using the OpenAI Images API, create
# thumbnails, and package them into a zip archive.
# ---------------------------------------------------------------------------


MARKDOWN_FILE = "old_prometheus_blog_full_content_inventory.md"
OUTPUT_DIR = "output"
ZIP_NAME = "prometheus_blog_images.zip"

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


def load_environment() -> None:
    """Load environment variables from .env file if present and validate API key."""
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    org_id = os.getenv("OPENAI_ORG_ID")
    if not api_key:
        logger.error("OPENAI_API_KEY is not set. Please add it to your environment or .env file.")
        raise EnvironmentError("OPENAI_API_KEY not found.")
    global openai_client
    if org_id:
        openai_client = OpenAI(api_key=api_key, organization=org_id)
    else:
        openai_client = OpenAI(api_key=api_key)


def parse_markdown_table(filepath: str) -> List[Dict[str, str]]:
    """Parse a markdown table and extract slug, hero_prompt, and thumbnail_prompt columns."""
    with open(filepath, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip().startswith("|")]

    if len(lines) < 2:
        logger.error("No markdown table detected in %s", filepath)
        raise ValueError("Invalid markdown table format.")

    header_parts = [part.strip() for part in lines[0].split("|")[1:-1]]
    try:
        slug_idx = header_parts.index("new_path")
    except ValueError:
        logger.error("Column `new_path` not found in markdown header.")
        raise

    rows = []
    # Skip the header and separator lines
    for line in lines[2:]:
        parts = [part.strip() for part in line.split("|")[1:-1]]
        if len(parts) != len(header_parts):
            continue  # Skip malformed rows
        raw_slug = parts[slug_idx].lstrip("/")
        # Convert path-like slug to filename-friendly string
        safe_slug = raw_slug.replace("/", "-")
        logger.info("Parsed slug: %s -> %s", raw_slug, safe_slug)
        rows.append({"slug": safe_slug})
    return rows


def backoff_sleep(attempt: int) -> None:
    """Sleep with exponential backoff."""
    delay = min(5 * (2 ** attempt), 60)
    logger.warning("Retrying after %s seconds...", delay)
    time.sleep(delay)


def generate_image(prompt: str, size: str = "1024x1024", retries: int = 5, image_model: str = "gpt-image-1") -> Optional[bytes]:
    """Generate an image from OpenAI and return raw PNG bytes.

    Args:
        prompt: The prompt to send to the API.
        size: Desired image size.
        retries: Maximum retries on failure.
        image_model: The OpenAI image model to use (default: gpt-image-1).

    Returns:
        PNG bytes if successful, None otherwise.
    """
    for attempt in range(retries):
        try:
            response = openai_client.images.generate(
                model=image_model,
                prompt=prompt,
                n=1,
                size=size,
            )
            print("API image response:", response)
            image_url = getattr(response.data[0], 'url', None)
            print("Image URL returned by API:", image_url)
            if not image_url:
                logger.error("No image URL returned by API.")
                break
            img_data = requests.get(image_url).content
            return img_data
        except (RateLimitError, APIError) as e:
            logger.error("OpenAI API error: %s", e)
            backoff_sleep(attempt)
        except Exception as e:
            logger.error("Unexpected error: %s", e)
            break
    logger.error("Failed to generate image after %d attempts", retries)
    return None


def save_image(data: bytes, path: str) -> None:
    """Save PNG bytes to the specified path."""
    with open(path, "wb") as f:
        f.write(data)
    logger.debug("Saved image to %s", path)


def create_thumbnail(hero_path: str, thumb_path: str, size: Tuple[int, int] = (800, 600)) -> None:
    """Create a thumbnail image from the hero image."""
    with Image.open(hero_path) as img:
        img = img.convert("RGB")
        img.thumbnail(size, Image.ANTIALIAS)
        img.save(thumb_path, format="PNG")
    logger.debug("Created thumbnail %s", thumb_path)


def zip_output_directory(output_dir: str, zip_name: str) -> None:
    """Zip all files in the output directory into a single archive."""
    with zipfile.ZipFile(zip_name, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(output_dir):
            for file in files:
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, output_dir)
                zipf.write(filepath, arcname=arcname)
    logger.info("Packaged images into %s", zip_name)


# ---------------------------------------------------------------------------
# Meta-prompting configuration
# ---------------------------------------------------------------------------

META_IMAGE_PROMPT = (
    "You are Prometheus Agency's brand art‑director. "
    "Read the blog article provided between <ARTICLE> tags, then:\n"
    "1. Identify a concise 3‑ to 6‑word ARTICLE_THEME capturing the post's main idea.\n"
    "2. Craft a SCENE_DESCRIPTION (setting + people) that would credibly illustrate the theme in a modern B2B office context.\n"
    "3. Write an ACTION_FOCUS sentence describing what the people are doing that clearly signals the theme.\n"
    "4. If a geographic location is mentioned (city/state), set LOCATION_CUE to a brief skyline hint; otherwise return an empty string.\n"
    "5. Using those elements, compose two finished DALL·E prompts:\n"
    "   • hero_prompt – photo‑realistic, 16:9 (1200×675), modern glass‑walled workspace, natural warm late‑afternoon light, "
    "     subtle brand‑color accents (deep navy #13213C, vivid orange #D54B00, accent gold #F09621) in objects or reflections, "
    "     realistic textures, shallow depth‑of‑field on skyline, no text, no sci‑fi graphics.\n"
    "   • thumb_prompt – photo‑realistic, 4:3 (800×600), tight crop or alternate angle that reinforces the theme, "
    "     same palette cues, balanced negative space, no text.\n"
    "Return ONLY a valid JSON object with keys exactly:\n"
    "  {{\n"
    '    "article_theme": "...",\n'
    '    "scene_description": "...",\n'
    '    "action_focus": "...",\n'
    '    "location_cue": "...",\n'
    '    "hero_prompt": "...",\n'
    '    "thumb_prompt": "..."\n'
    "  }}\n"
    "<ARTICLE>{blog_text}</ARTICLE>"
)

def get_blog_content(slug: str) -> str:
    """Get the blog content from the markdown file."""
    try:
        with open(MARKDOWN_FILE, "r", encoding="utf-8") as f:
            content = f.read()
            # Split into lines and find the header row
            lines = content.split("\n")
            header_parts = [part.strip() for part in lines[0].split("|")[1:-1]]
            
            # Find the indices we need
            new_path_idx = header_parts.index("new_path")
            body_text_idx = header_parts.index("Body_Text")
            
            # Debug: Print all slugs we find
            logger.info("Looking for slug: %s", slug)
            
            # Find the row with our slug
            for line in lines[2:]:  # Skip header and separator
                parts = [part.strip() for part in line.split("|")[1:-1]]
                if len(parts) != len(header_parts):
                    continue
                    
                current_path = parts[new_path_idx].strip("/")
                # Convert both to the same format for comparison
                normalized_current = current_path.replace("/", "-")
                normalized_slug = slug.replace("/", "-")
                
                if normalized_current == normalized_slug:
                    logger.info("Found content for %s", slug)
                    return parts[body_text_idx]
                    
        logger.error("No matching content found for slug: %s", slug)
        return ""
    except Exception as e:
        logger.error("Error reading blog content for %s: %s", slug, e)
        return ""

def extract_json_from_response(text: str) -> dict:
    """
    Extract the first JSON object from a string, even if surrounded by text or code blocks.
    """
    try:
        # Remove code block markers if present
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        # Find the first {...} block
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
        # Fallback: try to parse the whole thing
        return json.loads(text)
    except Exception as e:
        logger.error("Failed to extract JSON: %s", e)
        return {}

def generate_image_prompts(slug: str) -> Optional[Dict[str, str]]:
    print("=== ENTERED generate_image_prompts ===")
    blog_content = get_blog_content(slug)
    if not blog_content:
        print("No content found for", slug)
        return None

    response_content = None
    try:
        print("=== About to call OpenAI for slug: {} ===".format(slug))
        response = openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a professional art director specializing in B2B marketing imagery. Return ONLY valid JSON."},
                {"role": "user", "content": META_IMAGE_PROMPT.format(blog_text=blog_content)}
            ],
            temperature=0.7,
            max_tokens=1000,
            response_format={"type": "json_object"}
        )
        print("=== OpenAI call completed for slug: {} ===".format(slug))
        response_content = getattr(response.choices[0].message, "content", None)
        print("=== GPT-4 raw response: ===\n", repr(response_content))
        print("=== Full OpenAI response object: ===\n", repr(response))
        prompt_data = extract_json_from_response(response_content or "")
        required_fields = ["article_theme", "scene_description", "action_focus", "location_cue", "hero_prompt", "thumb_prompt"]
        if not all(field in prompt_data for field in required_fields):
            print("=== Missing required fields in prompt data: ===\n", prompt_data)
            return None
        print("=== Successfully parsed prompt data ===")
        return prompt_data
    except Exception as e:
        print("=== Error generating prompts for", slug, ":", e)
        if response_content is not None:
            print("=== GPT-4 raw response (exception): ===\n", repr(response_content))
        print("=== Traceback: ===\n", traceback.format_exc())
        return None

def main() -> None:
    try:
        parser = argparse.ArgumentParser(description="Generate Prometheus blog images")
        parser.add_argument("--limit", type=int, help="Process only the first N rows")
        parser.add_argument("--slugs", help="Comma-separated list of slug names to process")
        parser.add_argument("--image-model", default="gpt-image-1", help="Image model to use (gpt-image-1 or dall-e-3)")
        parser.add_argument("--test-prompt", help="Override the prompt for testing (single image only)")
        args = parser.parse_args()

        load_environment()

        if not os.path.exists(MARKDOWN_FILE):
            logger.error("Markdown file %s not found.", MARKDOWN_FILE)
            return

        os.makedirs(OUTPUT_DIR, exist_ok=True)
        rows = parse_markdown_table(MARKDOWN_FILE)
        
        if args.slugs:
            wanted = set(args.slugs.split(","))
            wanted_with_prefix = {f"insights/{slug}" for slug in wanted}
            wanted.update(wanted_with_prefix)
            rows = [r for r in rows if r["slug"] in wanted]
        elif args.limit:
            rows = rows[:args.limit]

        if not rows:
            logger.error("No matching rows found for the provided slugs")
            return

        progress = tqdm(rows, desc="Generating images", unit="image", disable=False)

        for row in progress:
            try:
                slug = row["slug"]
                hero_path = os.path.join(OUTPUT_DIR, f"{slug}-hero.png")
                thumb_path = os.path.join(OUTPUT_DIR, f"{slug}-thumbnail.png")

                if os.path.exists(hero_path) and os.path.exists(thumb_path):
                    progress.set_postfix({"status": "cached"})
                    continue

                if args.test_prompt:
                    hero_prompt = args.test_prompt
                else:
                    prompt_data = generate_image_prompts(slug)
                    if not prompt_data:
                        logger.error("Skipping %s due to prompt generation failure.", slug)
                        continue
                    hero_prompt = prompt_data["hero_prompt"]

                img_data = generate_image(hero_prompt, image_model=args.image_model)
                if img_data is None:
                    logger.error("Skipping %s due to image generation failure.", slug)
                    continue

                save_image(img_data, hero_path)
                
                # Check for interrupt after each major operation
                if signal.getsignal(signal.SIGINT) != signal_handler:
                    print("\n⚠️  Interrupted during image processing")
                    sys.exit(0)

                # Resize to 1200x675 while keeping object-cover like cropping
                try:
                    with Image.open(hero_path) as im:
                        im = im.convert("RGB")
                        # Crop center to 16:9 first
                        w, h = im.size
                        target_ratio = 16/9
                        current_ratio = w / h
                        if current_ratio > target_ratio:
                            # too wide
                            new_w = int(h * target_ratio)
                            left = (w - new_w) // 2
                            im = im.crop((left, 0, left + new_w, h))
                        else:
                            # too tall
                            new_h = int(w / target_ratio)
                            top = (h - new_h) // 2
                            im = im.crop((0, top, w, top + new_h))
                        im = im.resize((1200, 675), Image.LANCZOS)
                        im.save(hero_path, format="PNG")
                except Exception as e:
                    logger.error("Hero resize failed for %s: %s", slug, e)
                    continue

                # Check for interrupt after resize
                if signal.getsignal(signal.SIGINT) != signal_handler:
                    print("\n⚠️  Interrupted during image processing")
                    sys.exit(0)

                try:
                    create_thumbnail(hero_path, thumb_path)
                except Exception as e:
                    logger.error("Thumbnail creation failed for %s: %s", slug, e)
                    continue

                progress.set_postfix({"status": "done"})
                
            except KeyboardInterrupt:
                print("\n⚠️  Interrupted during image processing")
                sys.exit(0)
            except Exception as e:
                logger.error("Error processing %s: %s", slug, e)
                continue

        # Zip all generated files
        zip_output_directory(OUTPUT_DIR, ZIP_NAME)
        print("\n✅ All images saved and zipped: {}".format(ZIP_NAME))
    except KeyboardInterrupt:
        print("\n⚠️  Interrupted during processing")
        sys.exit(0)
    except Exception as e:
        logger.error("Error in main function: %s", e)
        sys.exit(1)


# ---------------------------------------------------------------------------
# Brand-consistent master prompts (edit here if style changes)
# ---------------------------------------------------------------------------

MASTER_HERO_PROMPT = (
    "A sleek, futuristic illustration in Prometheus Agency brand colors "
    "(#FF6B35 orange accents, deep navy #002E5D, soft neutral gradients). "
    "Stylized city skyline, glowing data-analytics graphs rising upward, subtle AI "
    "circuitry motifs, clean minimal background, cinematic lighting, ultra-sharp, 16:9 composition, no text."
)

# Thumbnail prompt currently unused because we derive thumbnail from hero image,
# but kept for possible future direct generation.
MASTER_THUMB_PROMPT = (
    "Minimal, modern illustration in Prometheus Agency colors: abstract data charts "
    "and upward arrows over a gradient backdrop, soft depth-of-field, 4:3 ratio, no text."
)


if __name__ == "__main__":
    main() 
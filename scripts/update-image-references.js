#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'fast-glob';

// Mapping of Supabase paths to local paths
const PATH_MAPPINGS = {
  'Active Client Logos': '/images/partners',
  'Prometheus Assets': '/images/logos',
  'team': '/images/team'
};

// Clean filename for matching
function cleanFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Extract filename from Supabase URL
function extractFilenameFromUrl(url) {
  const match = url.match(/\/([^\/]+)$/);
  return match ? match[1] : null;
}

// Convert Supabase URL to local path
export function convertSupabaseUrlToLocal(url) {
  // Check if it's a Supabase URL
  if (!url.includes('supabase.co/storage/v1/object/public/cms_media/')) {
    return url;
  }
  
  // Extract the path components
  for (const [supabasePath, localPath] of Object.entries(PATH_MAPPINGS)) {
    if (url.includes(encodeURIComponent(supabasePath))) {
      const filename = extractFilenameFromUrl(url);
      if (filename) {
        const cleanedFilename = cleanFilename(decodeURIComponent(filename));
        return `${localPath}/${cleanedFilename}`;
      }
    }
  }
  
  return url;
}

// Process a single file
async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    
    // Pattern to match Supabase URLs
    const supabaseUrlPattern = /https:\/\/[^'"]+supabase\.co\/storage\/v1\/object\/public\/cms_media\/[^'"]+/g;
    
    // Replace all Supabase URLs with local paths
    content = content.replace(supabaseUrlPattern, (match) => {
      const localPath = convertSupabaseUrlToLocal(match);
      if (localPath !== match) {
        modified = true;
        console.log(`  ${match} → ${localPath}`);
      }
      return localPath;
    });
    
    if (modified) {
      await fs.writeFile(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
export async function updateImageReferences() {
  console.log('🔍 Searching for Supabase image references...\n');
  
  // Find all TypeScript/JavaScript files
  const files = await glob(['src/**/*.{ts,tsx,js,jsx}'], {
    ignore: ['node_modules/**', 'dist/**', 'build/**']
  });
  
  console.log(`Found ${files.length} files to process\n`);
  
  let modifiedCount = 0;
  
  for (const file of files) {
    const wasModified = await processFile(file);
    if (wasModified) {
      console.log(`✓ Updated: ${file}`);
      modifiedCount++;
    }
  }
  
  console.log(`\n✅ Complete! Modified ${modifiedCount} files`);
  
  if (modifiedCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Review the changes in your code');
    console.log('2. Test that all images load correctly');
    console.log('3. Commit the changes');
  }
}

// Run if called directly
updateImageReferences().catch(console.error); 
#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';

const inputPng = 'public/prometheus-favicon.png';
const outputIco = 'public/favicon.ico';

const sizes = [16, 32, 48, 64];

async function generateFavicon() {
  try {
    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(inputPng)
          .resize(size, size)
          .toFormat('png')
          .toBuffer()
      )
    );
    // sharp can output .ico from an array of PNG buffers
    await sharp({
      create: {
        width: 64,
        height: 64,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      }
    })
      .png()
      .toFile('public/favicon-64x64.png');
    await sharp({
      pages: pngBuffers.length,
      pageHeight: 64
    })
      .joinChannel(pngBuffers)
      .toFile(outputIco);
    console.log('✅ favicon.ico generated successfully!');
  } catch (err) {
    console.error('Error generating favicon:', err);
  }
}

generateFavicon(); 
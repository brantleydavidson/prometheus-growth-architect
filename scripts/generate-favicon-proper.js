#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const inputPng = 'public/prometheus-favicon.png';
const outputIco = 'public/favicon.ico';

async function generateProperFavicon() {
  try {
    console.log('Generating new favicon.ico from prometheus-favicon.png...');
    
    // First, let's create a properly sized favicon directly
    await sharp(inputPng)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile('public/favicon-32x32.png');
    
    await sharp(inputPng)
      .resize(16, 16, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile('public/favicon-16x16.png');
    
    // Use the 16x16 as the main favicon.ico for now
    // (ICO format conversion in sharp is complex, so we'll use PNG which browsers support)
    await sharp(inputPng)
      .resize(16, 16, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toFile(outputIco.replace('.ico', '-temp.png'));
    
    // For maximum compatibility, let's also create apple-touch-icon
    await sharp(inputPng)
      .resize(180, 180, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile('public/apple-touch-icon.png');
    
    console.log('✅ Favicon files generated successfully!');
    console.log('Generated: favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png');
    console.log('\nNOTE: Since ICO conversion is complex, update index.html to use PNG favicons for better browser support.');
    
  } catch (err) {
    console.error('Error generating favicon:', err);
  }
}

generateProperFavicon(); 
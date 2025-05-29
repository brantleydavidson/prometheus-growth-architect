#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configuration for image sync
const IMAGE_SYNC_CONFIG = {
  'Active Client Logos': {
    localPath: 'public/images/partners',
    description: 'Partner and client logos'
  },
  'Prometheus Assets': {
    localPath: 'public/images/logos',
    description: 'Prometheus brand assets'
  },
  'team': {
    localPath: 'public/images/team',
    description: 'Team member photos'
  },
  'favicon': {
    localPath: 'public',
    description: 'Favicon files'
  }
};

// Helper function to download a file
async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      reject(err);
    });
  });
}

// Ensure directory exists
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Clean filename for local storage
function cleanFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Sync images from a specific Supabase folder
async function syncFolder(bucketName, folderPath, localPath) {
  console.log(`\n📁 Syncing ${folderPath} to ${localPath}...`);
  
  try {
    // Ensure local directory exists
    await ensureDir(localPath);
    
    // Special handling for favicon - look for specific files
    if (folderPath === 'favicon') {
      // Try to download favicon.ico directly from root
      const faviconFiles = ['favicon.ico', 'favicon.png', 'favicon.svg'];
      
      for (const filename of faviconFiles) {
        try {
          const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filename);
          
          const localFilePath = path.join(localPath, filename);
          
          try {
            await fs.access(localFilePath);
            console.log(`✓ ${filename} (already exists)`);
          } catch {
            console.log(`⬇️  Downloading ${filename}...`);
            await downloadFile(publicUrl, localFilePath);
            console.log(`✓ ${filename}`);
          }
        } catch (error) {
          // File might not exist, continue
        }
      }
      return;
    }
    
    // List files in Supabase folder
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        limit: 100,
        offset: 0
      });
    
    if (error) {
      console.error(`Error listing files in ${folderPath}:`, error);
      return;
    }
    
    if (!files || files.length === 0) {
      console.log(`No files found in ${folderPath}`);
      return;
    }
    
    console.log(`Found ${files.length} files to sync`);
    
    // Download each file
    for (const file of files) {
      if (file.name && !file.name.startsWith('.')) {
        const remotePath = folderPath ? `${folderPath}/${file.name}` : file.name;
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(remotePath);
        
        const cleanedFilename = cleanFilename(file.name);
        const localFilePath = path.join(localPath, cleanedFilename);
        
        try {
          // Check if file already exists
          await fs.access(localFilePath);
          console.log(`✓ ${cleanedFilename} (already exists)`);
        } catch {
          // File doesn't exist, download it
          console.log(`⬇️  Downloading ${cleanedFilename}...`);
          await downloadFile(publicUrl, localFilePath);
          console.log(`✓ ${cleanedFilename}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error syncing ${folderPath}:`, error);
  }
}

// Main sync function
async function syncSupabaseImages() {
  console.log('🚀 Starting Supabase image sync...\n');
  
  const bucketName = 'cms_media';
  
  // Sync each configured folder
  for (const [supabaseFolder, config] of Object.entries(IMAGE_SYNC_CONFIG)) {
    await syncFolder(bucketName, supabaseFolder, config.localPath);
  }
  
  console.log('\n✅ Image sync complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the synced images in the public folders');
  console.log('2. Update component references to use local paths instead of Supabase URLs');
  console.log('3. Commit the new images to git');
  console.log('\n💡 Tip: Add this script to your build process or run it periodically');
}

// Run the sync
syncSupabaseImages().catch(console.error); 
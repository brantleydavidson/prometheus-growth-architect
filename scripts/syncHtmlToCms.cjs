#!/usr/bin/env node
/*
  Sync exported HTML (Next.js `next export`) into Supabase cms_pages.content
  1. Run `next build && next export -o out` first (or via npm script)
  2. Then run:  node -r dotenv/config scripts/syncHtmlToCms.cjs
*/

const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { createClient } = require('@supabase/supabase-js');

if (!process.env.SUPA_URL || !process.env.SUPA_SERVICE_ROLE) {
  console.error('❌ SUPA_URL or SUPA_SERVICE_ROLE missing in env');
  process.exit(1);
}
const supa = createClient(process.env.SUPA_URL, process.env.SUPA_SERVICE_ROLE);

(async () => {
  const htmlFiles = await fg(['out/**/*.html']);
  console.log('Found', htmlFiles.length, 'HTML files');

  for (const file of htmlFiles) {
    // derive slug: out/index.html -> '' (home), out/about/index.html -> about, out/b2b.html -> b2b
    let rel = path.relative('out', file);
    rel = rel.replace(/index\.html$/, ''); // drop index.html
    rel = rel.replace(/\.html$/, ''); // drop .html
    if (rel.endsWith('/')) rel = rel.slice(0, -1);
    const slug = rel; // may be '' for home

    // skip 404.html etc.
    if (slug === '404' || slug.startsWith('_')) continue;

    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const bodyEl = dom.window.document.querySelector('body');
    if (!bodyEl) continue;

    // remove nav/footer wrappers (optional – based on site structure)
    // example: body > header, body > footer elements removal
    const header = bodyEl.querySelector('header');
    if (header) header.remove();
    const footer = bodyEl.querySelector('footer');
    if (footer) footer.remove();

    const cleanHtml = bodyEl.innerHTML.trim();

    const { data: row } = await supa.from('cms_pages').select('id, content').eq('slug', slug).single();
    if (!row) {
      console.log('⚠️  No cms_pages row for slug', slug);
      continue;
    }

    // only update if content empty
    if (!row.content) {
      await supa.from('cms_pages').update({ content: cleanHtml }).eq('id', row.id);
      console.log('✓ Injected content for', slug);
    } else {
      console.log('• content exists for', slug, 'skip');
    }
  }
  console.log('🚀 Sync complete');
  process.exit(0);
})(); 
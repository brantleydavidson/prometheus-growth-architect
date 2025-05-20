const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPA_URL,
  process.env.SUPA_SERVICE_ROLE
);

const PAGES_GLOB = [
  'src/pages/**/*.tsx',
  '!src/pages/insights/**',
  '!src/pages/InsightDetail/**',
  '!src/pages/admin/**'
];

function fileToSlug(file) {
  const base = path.basename(file).replace(/Page|LandingPage|Index/i, '').replace('.tsx', '');
  if (!base || base === 'Index') return '';
  
  // Special cases
  if (base === 'AIEnablement') return 'ai-enablement';
  if (base === 'AIQuotient') return 'ai-quotient';
  if (base === 'B2B') return 'b2b';
  if (base === 'SaaS') return 'saas';
  
  // Default: insert hyphen between lowercase+Uppercase transitions
  return base.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function extractFields(code) {
  const out = { hero_title:null, hero_subtitle:null, hero_image:null, seo:null, hero_cta_text:null, hero_cta_url:null, ctas:[] };
  const ast = parser.parse(code, {sourceType:'module', plugins:['typescript','jsx']});

  traverse(ast, {
    JSXElement(p) {
      const name = p.node.openingElement.name.name;

      if (name === 'SEO' && !out.seo) {
        const props = {};
        p.node.openingElement.attributes.forEach(attr=>{
          const key = attr.name.name;
          const v = attr.value;
          let val=null;
          if (!v) return;
          if (v.expression && v.expression.value) val = v.expression.value;
          if (v.type === 'StringLiteral') val = v.value;
          if (val) props[key]=val;
        });
        if (Object.keys(props).length) out.seo = JSON.stringify(props);
      }

      if (['h1','h2'].includes(name) && !out.hero_title) {
        out.hero_title = p.get('children')[0]?.node?.value?.trim() || null;
      }
      if (name==='p' && out.hero_title && !out.hero_subtitle) {
        out.hero_subtitle = p.get('children')[0]?.node?.value?.trim() || null;
      }
      if (name==='img' && !out.hero_image) {
        const srcAttr = p.node.openingElement.attributes.find(a=>a.name?.name==='src');
        out.hero_image = srcAttr?.value?.value || null;
      }
      if (name === 'CTABanner') {
        let text=null, url=null;
        p.node.openingElement.attributes.forEach(attr=>{
          const key=attr.name.name;
          const v=attr.value;
          const val=v && v.type==='StringLiteral' ? v.value : (v.expression && v.expression.value ? v.expression.value : null);
          if(key==='buttonText') text=val;
          if(key==='buttonLink') url=val;
        });
        if(text||url) {
          out.ctas.push({text,url});
          if(!out.hero_cta_text && text) out.hero_cta_text=text;
          if(!out.hero_cta_url && url) out.hero_cta_url=url;
        }
      }
    }
  });
  return out;
}

(async () => {
  const files = await fg(PAGES_GLOB);
  console.log('Found', files.length, 'page files');

  for (const file of files) {
    const slug = fileToSlug(file);
    console.log('Processing file:', file, '→ slug:', slug);
    
    const { data: row } = await supabase.from('cms_pages')
      .select('id, hero_title, hero_subtitle, hero_image, seo, hero_cta_text, hero_cta_url, ctas')
      .eq('slug', slug).single();

    if (!row) {
      console.log('▶︎ No row for slug:', slug);
      continue;
    }

    const code = fs.readFileSync(file,'utf8');
    const fields = extractFields(code);
    const update = {};

    ['hero_title','hero_subtitle','hero_image','seo','hero_cta_text','hero_cta_url'].forEach(f=>{
      if (!row[f] && fields[f]) update[f]=fields[f];
    });

    if(!row['ctas'] && fields.ctas.length) update.ctas = JSON.stringify(fields.ctas);

    if (Object.keys(update).length) {
      await supabase.from('cms_pages').update(update).eq('id', row.id);
      console.log('✓ Updated', slug, update);
    } else {
      console.log('• No changes for', slug);
    }
  }

  console.log('🚀  Done.');
})(); 
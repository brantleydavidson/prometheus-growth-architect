
# Guide for Adding New Blog Post to Supabase

To add the new "CRM Integration Services In Jackson MS" blog post, follow these steps:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/xkarbwfzxfxgtnefcout/
2. Navigate to the Table Editor
3. Select the `cms_blog_posts` table
4. Click "Insert row" and add the following data:

```
title: CRM Integration Services In Jackson MS
slug: crm-integration-services-in-jackson-ms
content: [Copy the full blog post content from your request]
excerpt: In the rapidly evolving business landscape, efficient customer relationship management (CRM) is crucial for success. Companies in Jackson, MS are increasingly turning to CRM integration services to enhance their systems and improve operational effectiveness.
author: Brantley Davidson
status: published
published_at: [Current date]
cover_image: [URL to your cover image - if you have one prepared]
seo: {
  "title": "CRM Integration Services In Jackson MS - Expert Solutions",
  "description": "Understand how CRM integration services can transform businesses in Jackson, Mississippi by enhancing efficiency, streamlining operations, and improving customer relationships.",
  "canonical": "/insights/crm-integration-services-in-jackson-ms", 
  "ogType": "article",
  "ogImage": "[URL to your OG image if available]",
  "category": "CRM Implementation"
}
```

5. Click "Save" to add the blog post to your database

After adding the post to the database, it will automatically be available through your dynamic blog post system at the path: `/insights/crm-integration-services-in-jackson-ms`

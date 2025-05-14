# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b94d72d7-87c6-4e1e-a318-10b286479417

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b94d72d7-87c6-4e1e-a318-10b286479417) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b94d72d7-87c6-4e1e-a318-10b286479417) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Image Management Best Practices

### Static Images (for blog, team, logos, etc.)
- Place images in the `public/images/` directory, organized by type:
  - `public/images/blog/` — Blog post images (use subfolders per post if needed)
  - `public/images/team/` — Team member photos
  - `public/images/logos/` — Logos and partners
- Reference images in your content as `/images/<type>/<filename>` (e.g., `/images/blog/post-1/hero.jpg`).
- Commit and push images to GitHub; Netlify will deploy them automatically.

### Dynamic or Large Images (User uploads, large media)
- Use Supabase Storage for scalable, cloud-hosted images.
- Upload via the Supabase dashboard or API to a bucket (e.g., `media` or `uploads`).
- Reference images by their public Supabase URL in your content or database.

### Best Practices
- Optimize images before uploading (WebP/AVIF preferred for new images).
- Use descriptive filenames and folders for organization.
- Always add alt text for accessibility and SEO.

### Example Folder Structure
```
public/
  images/
    blog/
      post-1/
        hero.jpg
        chart.png
    team/
      alice.jpg
      bob.jpg
    logos/
      partner1.png
```

### Example Usage
- Markdown: `![Alt text](/images/blog/post-1/hero.jpg)`
- JSX: `<img src="/images/blog/post-1/hero.jpg" alt="Description" />`
- Supabase: `<img src="https://<your-project>.supabase.co/storage/v1/object/public/media/blog/post-3/hero.jpg" alt="Description" />`

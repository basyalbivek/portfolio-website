Sanity Studio schemas

Files in this folder are example schemas for a Sanity studio.

How to use
1. Install Sanity CLI and create a studio (if you don't have one):
   ```bash
   npm install -g @sanity/cli
   sanity init --create-project my-portfolio
   ```
2. Copy the `schemas` folder into your studio's `schemas/` directory (or use this `sanity-studio/` folder as your studio).
3. From this repo you can run the studio if you have the Sanity CLI installed:
   ```bash
   cd sanity-studio
   npm install
   sanity start
   ```
4. To migrate existing posts to Sanity, create a write token in your Sanity project and run the migration script at the repo root:
   ```bash
   npm install @sanity/client
   SANITY_PROJECT_ID=yourProjectId SANITY_DATASET=production SANITY_TOKEN=yourToken node scripts/migrate-to-sanity.js
   ```

Notes
- The `post` schema stores `body` as plain text (HTML) to keep migration simple. You can convert `body` to Portable Text after migration.
- The `galleryImage` schema stores images as documents; you can reference them from posts if desired.

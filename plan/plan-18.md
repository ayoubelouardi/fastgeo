# Plan 18: Deployment Preparation

## Goal
Prepare the application for production deployment.

## Tasks
1.  Run a production build locally: `npm run build`.
2.  Fix any build errors or linting warnings.
3.  Create a `vercel.json` or `netlify.toml` if specific configuration is needed (usually auto-detected).
4.  Document the required Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) for the deployment platform.
5.  (Optional) Connect the GitHub repo to Vercel/Netlify and trigger a deploy.

## Verification
-   Verify the build command completes successfully.
-   Verify the deployed URL loads the application.

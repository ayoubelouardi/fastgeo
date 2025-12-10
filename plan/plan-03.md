# Plan 3: Supabase Client Integration

## Goal
Connect the Next.js frontend to the Supabase backend.

## Tasks
1.  Install the Supabase client library:
    ```bash
    npm install @supabase/supabase-js
    ```
2.  Create a `.env.local` file in the root directory.
3.  Add Supabase credentials to `.env.local`:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  Create a utility file `src/utils/supabase.ts` (or `.js`) to initialize and export the Supabase client.
5.  Create TypeScript interfaces/types for the `speed_tests` table row in `src/types/database.ts`.

## Verification
-   Import the supabase client in a temporary page.
-   Console log the client object to ensure it initializes without errors.

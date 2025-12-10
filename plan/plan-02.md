# Plan 2: Supabase Database Setup

## Goal
Set up the backend infrastructure on Supabase.

## Tasks
1.  Create a new Supabase project (via dashboard or CLI if local).
2.  Enable the **PostGIS** extension in the database.
    ```sql
    CREATE EXTENSION postgis;
    ```
3.  Create the `speed_tests` table with the schema defined in `docs/database_specifications.md`.
    -   Columns: `id`, `location` (GEOGRAPHY), `timestamp`, `operator`, `download_mb_s`, `upload_mb_s`.
4.  Create necessary indexes for `location`, `timestamp`, and `operator`.
5.  Enable Row Level Security (RLS) on the `speed_tests` table.
6.  Create RLS policies:
    -   **Public Insert**: Allow anonymous users to insert data.
    -   **Public Read**: Allow anonymous users to select data.

## Verification
-   Verify the table exists in the Supabase dashboard.
-   Verify PostGIS is enabled.
-   Verify RLS policies are active.

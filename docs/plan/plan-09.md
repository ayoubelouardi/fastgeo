# Plan 9: Data Submission Logic

## Goal
Submit the test results and location data to Supabase.

## Tasks
1.  Create a function `submitTestResult` in `src/utils/api.ts` (or similar).
2.  Construct the payload:
    -   `location`: formatted as a PostGIS point (e.g., `POINT(lng lat)` or using Supabase's geo format).
    -   `operator`: from `OperatorSelect`.
    -   `download_mb_s`, `upload_mb_s`: from `SpeedTest`.
3.  Call `supabase.from('speed_tests').insert([payload])`.
4.  Handle success and error responses.
5.  Add a "Submit" button (or auto-submit) on the Homepage after the test completes.

## Verification
-   Run a full test flow: Location -> Operator -> Speed Test -> Submit.
-   Check the Supabase dashboard to ensure the record was created with correct values.

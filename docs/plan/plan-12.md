# Plan 12: Map Data Fetching

## Goal
Retrieve speed test data from Supabase to display on the map.

## Tasks
1.  Create a function `fetchMapData` in `src/utils/api.ts`.
2.  Implement the Supabase query:
    -   Select `lat`, `lng`, `download_mb_s`, `operator`.
    -   (Optional) Limit the query to the map's current bounding box or a specific limit (e.g., last 1000 records) for performance.
3.  Call this function in the `MapContainer` component using `useEffect`.
4.  Store the data in the component state.

## Verification
-   Manually insert some dummy data into Supabase if needed.
-   Console log the fetched data in the Map component to verify retrieval.

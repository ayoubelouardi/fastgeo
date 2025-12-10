# Plan 11: Map Setup (React-Leaflet)

## Goal
Set up the interactive map on the Map page.

## Tasks
1.  Install `leaflet` and `react-leaflet`.
    ```bash
    npm install leaflet react-leaflet @types/leaflet
    ```
2.  Create a `MapContainer` component.
    -   *Note*: Leaflet requires client-side rendering. Ensure this component is dynamically imported with `ssr: false` in Next.js.
3.  Add the `TileLayer` using OpenStreetMap tiles.
4.  Fix default Leaflet icon issues (if using markers) or CSS import issues.
5.  Render the map on `src/app/map/page.tsx`.

## Verification
-   Navigate to `/map`.
-   Verify the map loads and displays the world map.
-   Verify zooming and panning work.

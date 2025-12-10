# Plan 13: Heatmap Implementation

## Goal
Visualize the speed data as a heatmap.

## Tasks
1.  Install `leaflet.heat` (or a react-leaflet compatible heatmap plugin).
    ```bash
    npm install leaflet.heat @types/leaflet.heat
    ```
    *Alternatively, use a library like `react-leaflet-heatmap-layer` if compatible with React 18/Next.js.*
2.  Create a `HeatmapLayer` component.
3.  Transform the fetched data into the format required by the heatmap plugin (usually `[lat, lng, intensity]`).
    -   Use `download_mb_s` as the intensity.
4.  Add the heatmap layer to the map.
5.  Configure heatmap gradient colors (Red < 5Mbps, Green > 50Mbps).

## Verification
-   Navigate to `/map`.
-   Verify that areas with data points show heatmap colors.

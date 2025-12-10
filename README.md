# Global Internet Speed Test Map

A privacy-first, crowdsourced internet speed testing platform with geolocation mapping. Users can test their internet speed, contribute anonymously, and visualize aggregate speeds by region and ISP globally.

## Features

- **Speed Test**: Measure download and upload speeds using embedded OpenSpeedTest.
- **Geolocation Mapping**: Capture user location (with permission) or allow manual selection on an interactive map.
- **ISP Selection**: Select your Internet Service Provider (ISP) to categorize results.
- **Anonymous Data**: Privacy-focused data collection (Location, Timestamp, Operator, Speeds only). No IP or personal data stored.
- **Interactive Heatmap**: Visualize global internet speeds with color-coded heatmaps.
- **Filters**: Filter map data by Operator and Date range.
- **Test-First Access**: Contribute a test result to unlock access to the global map.

## Tech Stack

- **Frontend**: Vanilla JS, HTML5, CSS3 (Hosted on Netlify)
- **Speed Test Engine**: [OpenSpeedTest](https://github.com/openspeedtest/Speed-Test)
- **Map Visualization**: [Leaflet.js](https://leafletjs.com) + OpenStreetMap
- **Database**: [Supabase](https://supabase.com) (PostgreSQL + PostGIS)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A Supabase account for the backend.

### Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/ayoubelouardi/fastgeo.git
    cd fastgeo
    ```

2.  Set up Supabase:
    - Create a new project in Supabase.
    - Enable PostGIS extension: `CREATE EXTENSION postgis;`
    - Create the `speed_tests` table (see `docs/software_specification_document.md` for schema).
    - Configure Row Level Security (RLS) for public inserts.

3.  Configure Environment Variables:
    - Create a `.env` file (or configured directly in your frontend code if strictly static without build process, though environment variables are recommended).
    - Add your Supabase URL and Anon Key.

4.  Run the application:
    - Open `index.html` in your browser or serve it using a simple static server (e.g., `python3 -m http.server` or `npx serve`).

## Usage

1.  **Start Test**: Click "Start Speed Test" on the homepage.
2.  **Grant Permissions**: Allow location access for accurate mapping.
3.  **Select Operator**: Choose your ISP from the dropdown.
4.  **Run Test**: Wait for the download and upload tests to complete.
5.  **View Map**: After submitting your result, explore the global speed heatmap.

## License

This project is open-source.

## Acknowledgments

- [OpenSpeedTest](https://github.com/openspeedtest/Speed-Test) for the speed testing engine.
- [Leaflet](https://leafletjs.com/) for the interactive maps.
- [Supabase](https://supabase.com/) for the backend infrastructure.



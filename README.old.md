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

- **Frontend**: Next.js (React), Tailwind CSS (Hosted on Vercel/Netlify)
- **Speed Test Engine**: [OpenSpeedTest](https://github.com/openspeedtest/Speed-Test)
- **Map Visualization**: [React-Leaflet](https://react-leaflet.js.org/) + OpenStreetMap
- **Database**: [Supabase](https://supabase.com) (PostgreSQL + PostGIS)

## Getting Started

### Prerequisites

- Node.js (v18+) and npm/yarn/pnpm.
- A Supabase account for the backend.

### Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/ayoubelouardi/fastgeo.git
    cd fastgeo
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Supabase:
    - Create a new project in Supabase.
    - Enable PostGIS extension: `CREATE EXTENSION postgis;`
    - Create the `speed_tests` table (see `docs/software_specification_document.md` for schema).
    - Configure Row Level Security (RLS) for public inserts.

4.  Configure Environment Variables:
    - Create a `.env.local` file.
    - Add your Supabase URL and Anon Key:
      ```
      NEXT_PUBLIC_SUPABASE_URL=your_url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
      ```

5.  Run the application:
    ```bash
    npm run dev
    ```
    - Open `http://localhost:3000` in your browser.

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



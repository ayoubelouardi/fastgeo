# Database Specifications

## 1. Database System
- **Provider**: Supabase
- **Engine**: PostgreSQL 15+
- **Extensions**: `postgis` (Required for `GEOGRAPHY` data types).

## 2. Schema Definitions

### 2.1 Table: `speed_tests`

This is the primary table for storing crowdsourced speed test data.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | `UUID` | `PK`, `DEFAULT gen_random_uuid()` | Unique identifier for the test record. |
| `location` | `GEOGRAPHY(POINT, 4326)` | `NOT NULL` | Geospatial point (Longitude, Latitude). |
| `timestamp` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Time of test submission. |
| `operator` | `TEXT` | `NOT NULL` | ISP Name (e.g., "IAM", "Orange"). |
| `download_mb_s` | `NUMERIC` | `NOT NULL` | Download speed in Megabits per second. |
| `upload_mb_s` | `NUMERIC` | `NOT NULL` | Upload speed in Megabits per second. |

### 2.2 Indexes

Indexes are critical for query performance, especially for geospatial and time-series filtering.

```sql
-- Geospatial Index for fast location-based queries (e.g., "tests near me")
CREATE INDEX idx_location ON speed_tests USING GIST (location);

-- Time Index for date range filtering
CREATE INDEX idx_timestamp ON speed_tests(timestamp);

-- Operator Index for filtering by ISP
CREATE INDEX idx_operator ON speed_tests(operator);
```

## 3. Security Policies (RLS)

Row Level Security is enabled to secure the database while allowing public access.

```sql
-- Enable RLS
ALTER TABLE speed_tests ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous users to insert data
CREATE POLICY "public_insert" 
ON speed_tests 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Allow anonymous users to read data (for map visualization)
CREATE POLICY "public_read" 
ON speed_tests 
FOR SELECT 
USING (true);
```

## 4. Data Integrity & Validation

- **Types**: Strict typing (`NUMERIC` for speeds) prevents invalid data formats.
- **Sanitization**: Supabase client handles SQL injection protection automatically.
- **Anonymization**: The schema explicitly excludes user identifiers.

## 5. Backup & Maintenance
- **Backups**: Handled automatically by Supabase (Daily backups).
- **Retention**: Old data (> 24 months) may be archived or deleted via a scheduled cron job (pg_cron) if storage limits are reached.

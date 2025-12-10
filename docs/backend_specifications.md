# Backend Specifications

## 1. Overview

This project utilizes a **Serverless / No-Backend** approach. There is no custom Node.js, Python, or Go server to maintain. All backend functionality is provided by **Supabase**, which acts as a Backend-as-a-Service (BaaS).

## 2. Supabase Configuration

### 2.1 Project Setup
- **Platform**: Supabase.com
- **Region**: Closest to target audience (e.g., EU West if targeting Morocco/Europe).
- **Extensions**: `postgis` must be enabled for geospatial capabilities.

### 2.2 API Access
- **Client Library**: `@supabase/supabase-js`
- **Endpoints**: Auto-generated RESTful endpoints provided by PostgREST.
- **Authentication**:
    - **Anon Key**: Public key used by the frontend client.
    - **Service Role Key**: Private key for admin tasks (not used in frontend).

## 3. Security & Access Control

Since the API key is public, security is enforced strictly at the database level using **Row Level Security (RLS)**.

### 3.1 Row Level Security (RLS) Policies

1.  **Public Insert (Anonymous Submission)**
    - **Target**: `speed_tests` table.
    - **Action**: `INSERT`.
    - **Role**: `anon` (unauthenticated users).
    - **Condition**: `true` (Allow all anonymous users to submit data).
    - *Note*: Rate limiting is handled by Supabase platform limits (e.g., CAPTCHA or IP limits if needed in future).

2.  **Public Read (Map Visualization)**
    - **Target**: `speed_tests` table.
    - **Action**: `SELECT`.
    - **Role**: `anon`.
    - **Condition**: `true` (Allow reading aggregate data).
    - *Optimization*: In the future, this might be restricted to a database view or RPC function to return only aggregated heatmap data instead of raw rows for privacy.

### 3.2 Data Validation
- **Database Constraints**:
    - `operator`: NOT NULL.
    - `download_mb_s`: NOT NULL, Numeric.
    - `upload_mb_s`: NOT NULL, Numeric.
    - `location`: NOT NULL, Geography type.

## 4. API Interactions

### 4.1 Submit Test Result
- **Method**: `POST`
- **Table**: `speed_tests`
- **Payload**:
  ```json
  {
    "location": "POINT(lng lat)",
    "operator": "IAM",
    "download_mb_s": 45.5,
    "upload_mb_s": 12.2
  }
  ```

### 4.2 Fetch Map Data
- **Method**: `GET`
- **Table**: `speed_tests`
- **Filters**:
    - `.gte('timestamp', date)`
    - `.eq('operator', operator)`
    - `.filter('location', 'st_dwithin', ...)`

## 5. Privacy & Data Retention

- **Anonymity**: No `user_id`, `ip_address`, or `device_id` columns exist in the schema.
- **Retention**: Data is retained for 24 months.
- **GDPR Compliance**: The backend stores only non-PII (Personally Identifiable Information) data related to infrastructure performance.

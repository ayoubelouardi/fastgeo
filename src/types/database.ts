export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      speed_tests: {
        Row: {
          id: string
          created_at: string
          operator: string
          download_mb_s: number
          upload_mb_s: number
          location: string // PostGIS geography type is returned as string representation
        }
        Insert: {
          id?: string
          created_at?: string
          operator: string
          download_mb_s: number
          upload_mb_s: number
          location: string
        }
        Update: {
          id?: string
          created_at?: string
          operator?: string
          download_mb_s?: number
          upload_mb_s?: number
          location?: string
        }
      }
    }
  }
}

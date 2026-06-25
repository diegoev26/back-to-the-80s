export interface Env {
  DRIVE_FOLDER_ID: string;
  GOOGLE_API_KEY: string;
  CLIENT_API_SECRET: string;
}

export interface ApiErrorResponse {
  error: string;
  code: number;
}

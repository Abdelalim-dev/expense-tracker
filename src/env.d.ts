/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_SHEET_ID: string
    readonly VITE_SHEET_URL: string
    readonly VITE_FIREBASE_API_KEI: string
    readonly AUTH_DOMAIN: string
    readonly PROJECT_ID: string
    readonly STORAGE_BUCKET: string
    readonly MESSAGING_SENDER_ID: string
    readonly APP_ID: string
    readonly DB: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
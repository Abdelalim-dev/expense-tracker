/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_SHEET_ID: string
    readonly VITE_SHEET_URL: string
    readonly VITE_FIREBASE_API_KEI: string
    readonly VITE_AUTH_DOMAIN: string
    readonly VITE_PROJECT_ID: string
    readonly VITE_STORAGE_BUCKET: string
    readonly VITE_MESSAGING_SENDER_ID: string
    readonly VITE_APP_ID: string
    readonly VITE_DB: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
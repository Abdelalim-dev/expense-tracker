/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_SHEET_ID: string
    readonly VITE_SHEET_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
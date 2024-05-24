/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // ... more environment variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

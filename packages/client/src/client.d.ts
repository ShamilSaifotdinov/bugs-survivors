declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string
declare const __NODE_ENV__: string
declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export {}

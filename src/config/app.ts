export default class Config {
  static get appName() {
    return import.meta.env.VITE_APP_NAME;
  }

  static get apiUrl() {
    return import.meta.env.VITE_API_BASE_URL;
  }

  static get providers() {
    return {
      auth: {
        default: import.meta.env.VITE_APP_AUTH_PROVIDER || 'local',
        options: {
          local: 'local',
          keycloak: 'keycloak',
        }
      }
    }
  }
}

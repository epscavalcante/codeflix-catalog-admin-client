
const authProviders: Record<'local'| 'keycloak', string> = {
    local: 'local', 
    keycloak: 'keycloak'   
}

export const providers =  {
    auth: {
        default: import.meta.env.VITE_APP_AUTH_PROVIDER || authProviders.local,
        options: authProviders
    }
}
  
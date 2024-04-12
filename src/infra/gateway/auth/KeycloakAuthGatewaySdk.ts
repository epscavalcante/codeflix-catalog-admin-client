import { useAuth } from "../../../composables/useAuth";
import AuthGateway, { LoginResponse } from "./AuthGateway";
import Keycloak from "keycloak-js";

export default class KeycloakAuthGatewaySdk implements AuthGateway {
  private keycloak?: Keycloak;
  private readonly serverUrl: string;
  private readonly clientId: string;
  private readonly realm: string;

  constructor() {
    this.realm = import.meta.env.VITE_KC_REALM;
    this.clientId = import.meta.env.VITE_KC_CLIENT_ID;
    this.serverUrl = import.meta.env.VITE_KC_SERVER_URL;

    if (!this.keycloak) {
      this.keycloak = new Keycloak({
        url: this.serverUrl,
        realm: this.realm,
        clientId: this.clientId,
      });

      this.init();
    }
  }

  async login(): Promise<LoginResponse> {
    if (!this.keycloak!.authenticated) {
      await this.keycloak?.login({
        // redirectUri: import.meta.env.VITE_APP_BASE_URL,
      });
    }
    console.log("KC logado", this.keycloak);
    useAuth().setToken(this.keycloak!.token as string);
    console.log(this.keycloak);

    return {
      access_token: this.keycloak!.token as string,
      expires_in: 1800,
      refresh_expires_in: 1800,
      refresh_token: this.keycloak!.refreshToken as string,
      token_type: "Bearer",
    };
  }

  async logout(): Promise<void> {
    if (this.keycloak?.authenticated) {
      localStorage.removeItem("token");
      return this.keycloak.logout({
        // redirectUri: import.meta.env.VITE_APP_BASE_URL,
      });
    }
  }

  private async init() {
    if (this.keycloak?.authenticated) {
      return;
    }

    try {
      const initialized = await this.keycloak!.init({
        onLoad: "check-sso",
        enableLogging: true,
      });
    } catch (error) {}
  }
}

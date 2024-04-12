import HttpClient from "../../http/HttpClient";
import { LoginRequest, LoginResponse } from "./AuthGateway";
import AuthGateway from "./AuthGateway";

export default class KeycloakAuthGatewayHttp implements AuthGateway {

  private readonly serverUrl: string;
  private readonly clientId: string;
  private readonly realm: string;

  constructor(readonly httpClient: HttpClient) {
    this.realm = import.meta.env.VITE_KC_REALM;
    this.clientId = import.meta.env.VITE_KC_CLIENT_ID;
    this.serverUrl = import.meta.env.VIT_KC_SERVER_URL;
  }

  async login(body: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>(
      `${this.serverUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      {
        ...body,
        grant_type: "password",
        client_id: this.clientId,
      },
      {
        headers: {
          common: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      }
    );

    return {
      access_token: response.access_token,
      expires_in: response.expires_in,
      refresh_expires_in: response.expires_in,
      refresh_token: response.refresh_token,
      token_type: response.token_type,
    };
  }

  async logout(): Promise<void> {
    await this.httpClient.post("/logout");
  }
}

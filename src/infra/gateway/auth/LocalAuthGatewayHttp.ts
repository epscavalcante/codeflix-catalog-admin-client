import HttpClient from "../../http/HttpClient";
import AuthGateway, { LoginRequest, LoginResponse } from "./AuthGateway";

export default class LocalAuthGatewayHttp implements AuthGateway {
  constructor(readonly httpClient: HttpClient) {}

  async login(body: LoginRequest): Promise<LoginResponse> {
    return {
      access_token: "access_token",
      expires_in: 1800,
      refresh_expires_in: 1800,
      refresh_token: "refresh_token",
      token_type: "Bearer",
    };
  }

  async logout(): Promise<void> {
    return;
  }
}

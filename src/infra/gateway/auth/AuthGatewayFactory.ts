import HttpClient from "../../http/HttpClient";
import AuthGatewayHttpFactory from "./AuthGatewayHttpFactory";
import KeycloakAuthGatewaySdk from "./KeycloakAuthGatewaySdk";

export default class AuthGatewayFactory {
  public static create(
    origin: string = 'http',
    provider?: string,
    httpClient?: HttpClient
  ) {
    if (origin === "sdk") {
      return new KeycloakAuthGatewaySdk();
    }

    if (origin === "http") {
      if (!provider) throw new Error("Provider is required.");
      if (!httpClient) throw new Error("HttpClient is required.");

      return AuthGatewayHttpFactory.create(httpClient, provider);
    }

    throw new Error("Origin is required.");
  }
}

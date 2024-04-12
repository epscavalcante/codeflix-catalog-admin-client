import Config from "../../../config/app";
import HttpClient from "../../http/HttpClient";
import KeycloakAuthGatewayHttp from "./KeycloakAuthGatewayHttp";
import LocalAuthGatewayHttp from "./LocalAuthGatewayHttp";

export default class AuthGatewayHttpFactory {

  public static create(httpClient: HttpClient, provider: string = 'local') {
    const providers = Config.providers.auth.options;
    
    if (provider === providers.local) return new LocalAuthGatewayHttp(httpClient);
    if (provider === providers.keycloak) return new KeycloakAuthGatewayHttp(httpClient);

    throw new Error(`Authentication provider ${provider} not supported`);
  }
}

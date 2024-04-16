import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import CategoryGatewayHttp from "./infra/gateway/category/CategoryGatewayHttp";
import AxiosHttpAdapter from "./infra/http/AxiosHttpAdapter";
import CastMemberGatewayHttp from "./infra/gateway/cast-member/CastMemberGatewayHttp";
import GenreGatewayHttp from "./infra/gateway/genre/GenreGatewayHttp";
import VideoGatewayHttp from "./infra/gateway/video/VideoGatewayHttp";
import Config from "./config/app";
import { router } from "./config/router";
import { pinia } from "./config/pinia";
import Keycloak, { KeycloakInitOptions, KeycloakConfig } from "keycloak-js";

let config: KeycloakConfig = {
  url: import.meta.env.VITE_KC_SERVER_URL,
  realm: import.meta.env.VITE_KC_REALM,
  clientId: import.meta.env.VITE_KC_CLIENT_ID,
};

let keycloak = new Keycloak(config);

let initOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  // redirectUri: "http://localhost:5147/",
  //enableLogging: true,
  // checkLoginIframe: false,
};

keycloak
  .init(initOptions)
  .then(() => {
    localStorage.setItem("keycloak", JSON.stringify(keycloak));
    const app = createApp(App);
    const httpClient = new AxiosHttpAdapter({
      baseURL: Config.apiUrl,
      headers: {
        Authorization: `${keycloak.tokenParsed?.typ} ${keycloak.token}`,
      },
    });

    const categoryGateway = new CategoryGatewayHttp(httpClient);
    app.provide("categoryGateway", categoryGateway);
    const castMemberGateway = new CastMemberGatewayHttp(httpClient);
    app.provide("castMemberGateway", castMemberGateway);
    const genreGateway = new GenreGatewayHttp(httpClient);
    app.provide("genreGateway", genreGateway);
    const videoGateway = new VideoGatewayHttp(httpClient);
    app.provide("videoGateway", videoGateway);

    app.use(pinia);
    app.use(router);

    app.mount("#app");
    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed");
          } else {
            console.warn("Token not refreshed");
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 6000);
  })
  .catch((err) => console.error("Autentication failed", err));

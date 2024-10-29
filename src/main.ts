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
import { vueKeycloak } from "@josempgon/vue-keycloak";

const app = createApp(App);

const httpClient = new AxiosHttpAdapter({
  baseURL: Config.apiUrl,
});

const categoryGateway = new CategoryGatewayHttp(httpClient);
const castMemberGateway = new CastMemberGatewayHttp(httpClient);
const genreGateway = new GenreGatewayHttp(httpClient);
const videoGateway = new VideoGatewayHttp(httpClient);

app.provide("categoryGateway", categoryGateway);
app.provide("castMemberGateway", castMemberGateway);
app.provide("genreGateway", genreGateway);
app.provide("videoGateway", videoGateway);
app.use(pinia);
app.use(router);
app.use(vueKeycloak, {
  config: {
    url: import.meta.env.VITE_KC_SERVER_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
  },
  initOptions: {
    flow: "standard",
    checkLoginIframe: true,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
  },
});

app.mount("#app");

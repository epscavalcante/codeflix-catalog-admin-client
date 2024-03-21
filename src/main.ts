import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import CategoryGatewayHttp from './infra/gateway/category/CategoryGatewayHttp'
import AxiosHttpAdapter from './infra/http/AxiosHttpAdapter'
import FetchHttpAdaper from './infra/http/FetchHttpAdapter'
import CastMemberGatewayHttp from './infra/gateway/cast-member/CastMemberGatewayHttp'
import GenreGatewayHttp from './infra/gateway/genre/GenreGatewayHttp'
import VideoGatewayHttp from './infra/gateway/video/VideoGatewayHttp'
import Config from './config/app'
import { router } from './config/router'

const app = createApp(App);
app.use(router);

const httpClient = new AxiosHttpAdapter(Config.apiUrl);

const categoryGateway = new CategoryGatewayHttp(httpClient);
app.provide("categoryGateway", categoryGateway);
const castMemberGateway = new CastMemberGatewayHttp(httpClient);
app.provide("castMemberGateway", castMemberGateway);
const genreGateway = new GenreGatewayHttp(httpClient);
app.provide("genreGateway", genreGateway);
const videoGateway = new VideoGatewayHttp(httpClient);
app.provide("videoGateway", videoGateway);

app.mount('#app');
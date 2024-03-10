import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {routes} from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import MemoryHttpAdapter from './infra/http/MemoryHttpAdapter'
import CategoryGatewayHttp from './infra/gateway/category/CategoryGatewayHttp'
import AxiosHttpAdapter from './infra/http/AxiosHttpAdapter'
import FetchHttpAdapter from './infra/http/FetchHttpAdapter'
import CastMemberGatewayHttp from './infra/gateway/cast-member/CastMemberGatewayHttp'
import GenreGatewayHttp from './infra/gateway/genre/GenreGatewayHttp'

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-gray-900 text-white'
});
app.use(router);

// const httpClient = new MemoryHttpAdapter();
// const httpClient = new FetchHttpAdapter();
const httpClient = new AxiosHttpAdapter();
const categoryGateway = new CategoryGatewayHttp(httpClient);
app.provide("categoryGateway", categoryGateway);
const castMemberGateway = new CastMemberGatewayHttp(httpClient);
app.provide("castMemberGateway", castMemberGateway);
const genreGateway = new GenreGatewayHttp(httpClient);
app.provide("genreGateway", genreGateway);

app.mount('#app');
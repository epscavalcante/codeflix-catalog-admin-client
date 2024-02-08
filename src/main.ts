import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {routes} from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import MemoryHttpAdapter from './infra/http/MemoryHttpAdapter'
import CategoryGatewayHttp from './infra/gateway/CategoryGatewayHttp'
import AxiosHttpAdapter from './infra/http/AxiosHttpAdapter'
import FetchHttpAdapter from './infra/http/FetchHttpAdapter'

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes
});
app.use(router);

// const httpClient = new MemoryHttpAdapter();
// const httpClient = new AxiosHttpAdapter();
const httpClient = new FetchHttpAdapter();
const categoryGateway = new CategoryGatewayHttp(httpClient);
app.provide("categoryGateway", categoryGateway);

app.mount('#app');
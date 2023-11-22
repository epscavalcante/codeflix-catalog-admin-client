import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {routes} from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import CategoryMemoryService from './domain/CategoryMemoryService'

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes
});

app.use(router);

app.provide("CategoryService", new CategoryMemoryService());

app.mount('#app');
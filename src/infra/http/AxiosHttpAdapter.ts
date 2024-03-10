import axios, { AxiosInstance } from "axios";
import HttpClient from "./HttpClient";

export default class AxiosHttpAdapter implements HttpClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000'
    })
  }

  get(url: string): Promise<any> {
    return this.axios.get(url);
  }

  post(url: string, body: any): Promise<any> {
    return this.axios.post(url, body);
  }

  patch(url: string, body: any): Promise<any> {
    return this.axios.patch(url, body);
  }

  delete(url: string): Promise<any> {
    return this.axios.delete(url);
  }
}

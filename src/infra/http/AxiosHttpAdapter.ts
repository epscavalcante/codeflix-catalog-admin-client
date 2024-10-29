import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import HttpClient from "./HttpClient";

export default class AxiosHttpAdapter implements HttpClient {
  private axios: AxiosInstance;

  constructor(readonly config?: CreateAxiosDefaults) {
    if (!config?.baseURL) throw new Error("The baseUrl is required");
    this.axios = axios.create(config);
  }

  async get(url: string, options?: any): Promise<any> {
    try {
      const response = await this.axios.get(url, options);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async post<R>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const response = await this.axios.post(url, body, config);

      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }

  async patch(url: string, body: any): Promise<any> {
    try {
      const response = await this.axios.patch(url, body);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async delete(url: string): Promise<any> {
    try {
      const response = await this.axios.delete(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
}

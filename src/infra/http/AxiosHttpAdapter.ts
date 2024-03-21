import axios, { AxiosInstance } from "axios";
import HttpClient from "./HttpClient";

export default class AxiosHttpAdapter implements HttpClient {
  private axios: AxiosInstance;

  constructor(readonly baseUrl: string) {
    if (!baseUrl) throw new Error("The baseUrl is required");
    this.axios = axios.create({
      baseURL: baseUrl,
    });
  }

  async get(url: string): Promise<any> {
    try {
      const response = await this.axios.get(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  async post(url: string, body: any): Promise<any> {
    try {
      const response = await this.axios.post(url, body);

      return response.data;
    } catch (error: any) {
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

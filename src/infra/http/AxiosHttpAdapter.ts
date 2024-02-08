import HttpClient from "./HttpClient";

export default class AxiosHttpAdapter implements HttpClient {
  get(url: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  post(url: string, body: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

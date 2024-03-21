import HttpClient from "./HttpClient";

export default class FetchHttpAdapter implements HttpClient {
  baseUrl: string;

  constructor(readonly baseURL: string) {
    if (!baseURL) throw new Error("The baseURL is required");
    this.baseUrl = baseURL;
  }

  patch(url: string, body: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(url: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async get(url: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`);
    return response.json();
  }

  async post(url: string, body: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

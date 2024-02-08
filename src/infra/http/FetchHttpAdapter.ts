import HttpClient from "./HttpClient";

export default class FetchHttpAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await fetch(`http://localhost:3000${url}`);
    return response.json();
  }

  async post(url: string, body: any): Promise<any> {
    const response = await fetch(`http://localhost:3000${url}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }
}

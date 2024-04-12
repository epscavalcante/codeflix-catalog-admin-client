export default interface HttpClient {
  get(url: string): Promise<any>;
  post<R = any>(url: string, body?: any, config?: any): Promise<any>;
  patch(url: string, body: any): Promise<any>;
  delete(url: string): Promise<any>;
}

export default interface HttpClient {
  get(url: string, options?: any): Promise<any>;
  post<R = any>(url: string, body?: any, options?: any): Promise<any>;
  patch(url: string, body: any, options?: any): Promise<any>;
  delete(url: string, options?: any): Promise<any>;
}

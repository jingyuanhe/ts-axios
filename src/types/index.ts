export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'put' | 'PUT' | 'head' | 'HEAD' | 'options' | 'OPTIONS'
export interface AxiosReuestConfig {
    url: string;
    method?: Method;
    params?: any;
    data?: any;
    headers?: any
    responseType?: XMLHttpRequestResponseType
}
export interface AxiosResponse {
    data: any
    status: number
    statusText: string
    headers: any
    config:AxiosReuestConfig
    request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {
    
}
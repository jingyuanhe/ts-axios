export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'put' | 'PUT' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'patch' | 'PATCH'
export interface AxiosReuestConfig {
    url?: string;
    method?: Method;
    params?: any;
    data?: any;
    headers?: any
    responseType?: XMLHttpRequestResponseType,
    timeout?: number
}
export interface AxiosResponse<T=any> {
    data: T
    status: number
    statusText: string
    headers: any
    config:AxiosReuestConfig
    request: any
}
export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {
    
}
export interface AxiosError extends Error {
    isAxiosError: boolean
    config:AxiosReuestConfig
    code?: string | null
    request?:any
    response?:AxiosResponse
}
export interface Axios {
    interceptors: {
        request:AxiosInterceptorMangger<AxiosReuestConfig>
        response:AxiosInterceptorMangger<AxiosResponse>
    }
    request<T=any>(config:AxiosReuestConfig): AxiosPromise<T>
    get<T=any>(url:string,config?: AxiosReuestConfig): AxiosPromise<T>
    delete<T=any>(url:string,config?: AxiosReuestConfig): AxiosPromise<T>
    head<T=any>(url:string,config?: AxiosReuestConfig): AxiosPromise<T>
    options<T=any>(url:string,config?: AxiosReuestConfig): AxiosPromise<T>
    post<T=any>(url:string,data?:any,config?: AxiosReuestConfig): AxiosPromise<T>
    put<T=any>(url:string,data?:any,config?: AxiosReuestConfig): AxiosPromise<T>
    patch<T=any>(url:string,data?:any,config?: AxiosReuestConfig): AxiosPromise<T>
}
export interface AxiosInstance extends Axios{
    <T=any>(config:AxiosReuestConfig): AxiosPromise<T>
    <T=any>(url:string,config?:AxiosReuestConfig): AxiosPromise<T>
}
export interface AxiosInterceptorMangger<T>{
    use(resolved:ResolvedFn<T>,rejected?:RejectedFn):number
    eject(id:number):void
}
export interface ResolvedFn<T>{
    (val:T):T|Promise<T>
}
export interface RejectedFn{
    (error:any):any
}
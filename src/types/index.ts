export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'put' | 'PUT' | 'head' | 'HEAD' | 'options' | 'OPTIONS'
export interface AxiosReuestConfig {
    url: string,
    method?: Method,
    params?: any,
    data?: any
}
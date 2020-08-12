import {AxiosReuestConfig,AxiosPromise, AxiosResponse} from '../types'
import {buildURL} from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import {processHeaders} from '../helpers/headers'
import xhr from './xhr' 
export default function dispatchRequest(config: AxiosReuestConfig): AxiosPromise {
    processConfig(config);
    return xhr(config).then(res => {
        return transformRequestData(res)
    })
}
function processConfig(config: AxiosReuestConfig): void {
    config.url = transformURL(config);
    config.headers = transfromHeaders(config);
    config.data = transformData(config);
}
function transformURL(config: AxiosReuestConfig): string {
 const {url, params} = config;
 return buildURL(url!, params);
}
function  transformData(config:AxiosReuestConfig): void {
    return transformRequest(config.data);
}
function transfromHeaders (config:AxiosReuestConfig):any {
    const {headers = {}, data} = config;
    return processHeaders(headers, data)
}
function transformRequestData(res:AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}
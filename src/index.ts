import {AxiosReuestConfig} from './types'
import {buildURL} from './helpers/url'
import xhr from './xhr'
function axios(config: AxiosReuestConfig): void {
    processConfig(config);
    xhr(config)
}
function processConfig(config: AxiosReuestConfig): void {
    config.url = transformURL(config);
}
function transformURL(config: AxiosReuestConfig): string {
 const {url, params} = config;
 return buildURL(url, params);
}
export default axios
import {AxiosReuestConfig, AxiosPromise, Method, AxiosResponse,RejectedFn,ResolvedFn} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManage from './interceptorManage'
interface Interceptors {
    request:InterceptorManage<AxiosReuestConfig>
    response:InterceptorManage<AxiosResponse>
}
interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config:AxiosReuestConfig) => AxiosPromise)
    rejected?:RejectedFn
}
export default class Axios {
    interceptors:Interceptors
    constructor() {
        this.interceptors = {
            request: new InterceptorManage<AxiosReuestConfig>(),
            response: new InterceptorManage<AxiosResponse>()
        }
    }
    request(url?:any,config?:any): AxiosPromise {
        if(typeof url === 'string') {
            if(!config) {
                config = {};
            }
            config.url = url;
        } else {
            config = url;
        }
        const chain:PromiseChain<any>[] = [{
            resolved:dispatchRequest,
            rejected:undefined
        }]
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })
        let promise = Promise.resolve(config);
        while(chain.length) {
            const {resolved, rejected} = chain.shift()!;
            promise = promise.then(resolved,rejected);
        }
        return promise;
    }
    get(url:string, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }
    delete(url:string, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }
    head(url:string, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }
    options(url:string, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }
    post(url:string, data?:any, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }
    put(url:string, data?:any, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }
    patch(url:string, data?:any, config?:AxiosReuestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }
    _requestMethodWithData(method: Method,url:string,data?:any, config?:AxiosReuestConfig): AxiosPromise{
        return this.request(Object.assign(config || {},{
            method,
            url,
            data
        }))
    }
    _requestMethodWithoutData(method: Method,url:string,config?:AxiosReuestConfig): AxiosPromise{
        return this.request(Object.assign(config || {},{
            method,
            url
        }))
    }
}
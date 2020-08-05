import {AxiosReuestConfig} from './types'
import xhr from './xhr'
function axios(config: AxiosReuestConfig): void {
    xhr(config)
}
export default axios
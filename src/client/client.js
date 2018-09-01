/**
 * Created by huk on 2018/7/29.
 */
import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error.response)
});

const httpServer = (opts, data) => {

    //公共参数
    let Public = {};

    // let token = localStorage.getItem('token');
    const { isAS, method, url } = opts;

    // axios.defaults.headers.common['Authorization'] = 'bearer ' + token;

    //http默认配置
    let httpDefaultOpts = {
        method,
        baseURL: ENV.API,
        url,
        timeout: 10000,
        params: Object.assign(Public, data),
        data: qs.stringify(Object.assign(Public, data))
    }

    if (method == 'get') {
        delete httpDefaultOpts.data
    } else {
        delete httpDefaultOpts.params
    }

    let promise = new Promise(function (resolve, reject) {
        axios(httpDefaultOpts).then(
            (res) => {
                resolve(res.data)
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )

    })
    return promise
}

export default httpServer
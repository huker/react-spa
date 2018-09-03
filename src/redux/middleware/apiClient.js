/**
 * Created by huk on 2018/7/29.
 */
import axios from 'axios';
import qs from 'qs';
import lodash from "lodash";

const methods = ['get', 'post', 'put', 'patch', 'delete'];

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


export default class ApiClient {

    token;

    setToken(token) {
        this.token = token;
    }

    constructor() {
        methods.forEach((method) => {
            this[method] = (url, { params, data, file, type } = {}) => {
                return new Promise((resolve, reject) => {

                    let Public = {};

                    const baseURL = process.env.API;

                    axios.defaults.headers.common['Authorization'] = 'bearer ' + this.token;

                    let httpDefaultOpts = {
                        method,
                        baseURL,
                        url,
                        timeout: 10000,
                        params: Object.assign(Public, data),
                        data: qs.stringify(Object.assign(Public, data))
                    };


                    if (method === 'get') {
                        delete httpDefaultOpts.data
                    } else {
                        delete httpDefaultOpts.params
                    }

                    axios(httpDefaultOpts).then(
                        (res) => {
                            console.log("axios", res.data)
                            resolve(res.data)
                        }
                    ).catch(
                        (response) => {
                            reject(response)
                        }
                    )
                })
            }
        })
    }
}

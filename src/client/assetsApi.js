/**
 * Created by huk on 2018/7/29.
 */
import httpServer from "./client";

export function loadData() {
    return new Promise((resolve, reject) => {
        httpServer({
            method: 'get',
            url: '/topics'
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
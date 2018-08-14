/**
 * Created by huk on 2018/8/13.
 */

export const LOAD_NEWS = 'news/LOAD_NEWS';
export const LOAD_NEWS_SUCCESS = 'news/LOAD_NEWS_SUCCESS';
export const LOAD_NEWS_FAIL = 'news/LOAD_NEWS_FAIL';

export const INCREMENT = "news/INCREMENT";
export const DECREMENT = "news/DECREMENT";
export const RESET = "news/RESET";


export function increment() {
    return { type: INCREMENT }
}

export function decrement() {
    return { type: DECREMENT }
}

export function reset() {
    return { type: RESET }
}

export function loadNewsList() {
    return {
        types: [LOAD_NEWS, LOAD_NEWS_SUCCESS, LOAD_NEWS_FAIL],
        promise: (client) => client.get('/topics')
    }
}
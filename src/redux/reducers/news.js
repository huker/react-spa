/**
 * Created by huk on 2018/8/13.
 */

import { INCREMENT, DECREMENT, RESET, LOAD_NEWS_SUCCESS } from "../actions/newsAction";

const initState = {
    count: 0
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };
        case RESET:
            return {
                ...state,
                count: 0
            };
        case LOAD_NEWS_SUCCESS:
            return {
                ...state,
                newsData: action.result
            };
        default:
            return state
    }
}
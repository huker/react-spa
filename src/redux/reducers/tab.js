/**
 * Created by huk on 2018/8/13.
 */

import { CHANGE_TAB } from "../actions/tabAction";

const initState = {
    active: '/'
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                active: action.data
            };
        default:
            return state
    }
}
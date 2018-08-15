/**
 * Created by huk on 2018/8/13.
 */

import news from "./reducers/news";
import tab from "./reducers/tab";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

export default combineReducers({
    routing: routerReducer,
    news,
    tab
})
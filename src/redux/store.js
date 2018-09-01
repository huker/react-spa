/**
 * Created by huk on 2018/8/14.
 */

import { createStore, applyMiddleware, compose } from "redux";
import combineReducers  from "./reducers";
import thunk from "redux-thunk";
import clientMiddleware from "./middleware/clientMiddleware";
import persistState from "redux-localstorage";
import ApiClient from "./middleware/apiClient";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";

const client = new ApiClient();
const clientMiddle = clientMiddleware(client);
const history = createHashHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const finalCreateStore = compose(
    //persistState:['auth'] 持续化store client那边就可以取token了
    applyMiddleware(
        thunk,
        clientMiddle,
        reduxRouterMiddleware
    )
)(createStore);

export default (initialState) => {
    const store = finalCreateStore(combineReducers, initialState);
    if (module && module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers'))
        );
    }
    return store
};
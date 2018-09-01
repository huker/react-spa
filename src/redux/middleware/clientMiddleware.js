/**
 * Created by huk on 2018/8/14.
 */

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => {
        return next => action => {
            if (typeof action === 'function') {
                action(dispatch, getState);
                return;
            }
            const {
                promise,
                types,
                afterSuccess,
                ...rest
            } = action;


            if (!action.promise) {
                return next(action);
            }

            //这边做一下token的持续化 在store里配了persist 由于没有写auth的action 就注释一下了
            // const _token = getState()['auth'].token;

            // if (_token) {
            //     client.setToken(_token)
            // }

            const [REQUEST, SUCCESS, FAILURE] = types;

            /*开始请求的时候，发一个action*/
            next({
                ...rest,
                type: REQUEST
            });

            const onFulfilled = result => {
                next({
                    ...rest,
                    result,
                    type: SUCCESS
                });
                if (afterSuccess) {
                    afterSuccess(dispatch, getState, result);
                }
            };

            const onRejected = error => {
                next({
                    ...rest,
                    error,
                    type: FAILURE
                });
            };

            return promise(client).then(onFulfilled, onRejected).catch(error => {
                console.error('MIDDLEWARE ERROR:', error);
                onRejected(error)
            })
        }
    }
}
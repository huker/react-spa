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

            console.log(promise)

            if (!action.promise) {
                return next(action);
            }

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

            console.log("client", promise(client))

            return promise(client).then(onFulfilled, onRejected).catch(error => {
                console.error('MIDDLEWARE ERROR:', error);
                onRejected(error)
            })
        }
    }
}
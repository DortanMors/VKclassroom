import { createStore, applyMiddleware, combineReducers }from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import thunk from 'redux-thunk';

import appState from './reducers/appState';
import cardState from './reducers/cardState';

export default function configureStore(router, initialState = {}) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk,
        router5Middleware(router)
        //,createLogger()
    )(createStore)

    const store = createStoreWithMiddleware(
        combineReducers({
            router: router5Reducer,
            appState,
            cardState
        }),
        initialState
    )

    window.store = store
    return store
}
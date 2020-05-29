import { createStore, applyMiddleware, combineReducers }from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import appState from './reducers/appState';
import userState from './reducers/userState';
import classroomState from './reducers/classroomState';

export default function configureStore(router, initialState = {}) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk,
        router5Middleware(router),
        createLogger()
    )(createStore)

    const store = createStoreWithMiddleware(
        combineReducers({
            router: router5Reducer,
            appState,
            userState,
            classroomState
        }),
        initialState
    )

    window.store = store
    return store
}
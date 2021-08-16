import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {
    repositoriesReducer,
} from "./repositoriesReducer";
import createSagaMiddleware from 'redux-saga';
import {rootWatcher} from "./sagas";

const rootReducer = combineReducers({
    data: repositoriesReducer
})

const sagaMiddleware = createSagaMiddleware()

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export type AllAppStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(rootWatcher)

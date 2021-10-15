import { connectRouter, RouterAction, routerMiddleware, RouterState } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import { userReducer, UserState } from "./redux/user/reducer";

import thunk, { ThunkDispatch } from 'redux-thunk'

import { UserActions } from "./redux/user/actions";

export const history = createBrowserHistory();

export type RootAction = RouterAction | UserActions

export type RootThunkDispatch = ThunkDispatch<RootState, null, RootAction>

export interface RootState {


    user: UserState,
    router: RouterState,
}

const reducer = combineReducers<RootState>({


    user: userReducer,
    router: connectRouter(history)
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk),
))
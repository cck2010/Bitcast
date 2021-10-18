import {
    connectRouter,
    RouterAction,
    routerMiddleware,
    RouterState,
} from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { userReducer, UserState } from "./redux/user/reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { UserActions } from "./redux/user/actions";
import { CreateBids, createBidsReducer } from "./redux/createbid/reducer";
import { productsReducer, ProductsState } from "./redux/products/reducer";
import { liveStreamReducer, LiveStreamState } from "./redux/LiveStream/reducer";
import { LiveStreamActions } from "./redux/LiveStream/actions";

export const history = createBrowserHistory();

export type RootAction = RouterAction | UserActions | LiveStreamActions;

export type RootThunkDispatch = ThunkDispatch<RootState, null, RootAction>;

export interface RootState {
    user: UserState;
    router: RouterState;
    CreateBids: CreateBids;
    products: ProductsState;
    liveStream: LiveStreamState;
}

const reducer = combineReducers<RootState>({
    user: userReducer,
    CreateBids: createBidsReducer,
    products: productsReducer,
    router: connectRouter(history),
    liveStream: liveStreamReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(thunk)
    )
);

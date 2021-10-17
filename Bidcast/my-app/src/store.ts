import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { CreateBids, createBidsReducer } from "./redux/createbid/reducer";
import { productsReducer, ProductsState } from "./redux/products/reducer";

export interface RootState {
    CreateBids: CreateBids,
    products: ProductsState

}

const reducer = combineReducers<RootState>({
    CreateBids: createBidsReducer,
    products: productsReducer
})

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  export const store = createStore(
    reducer)
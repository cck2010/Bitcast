import { SearchProductsActions } from "./action";
import produce from "immer";
import { Product } from "../products/actions";

export interface ProductSearchState {
    productList: Product[]
}

const initialState: ProductSearchState = {
    productList: []
}

export function productSearchReducer(
    state: ProductSearchState = initialState,
    action: SearchProductsActions
): ProductSearchState {
    return produce(state, (newState) => {

        switch (action.type) {
            case "@@products/LOAD_PRODUCT_SEARCH_RESULT":
                newState.productList = action.productList
                break;
        }
    })
}

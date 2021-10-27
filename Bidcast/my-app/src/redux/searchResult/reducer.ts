import { CategoriesFilter, SearchProduct, SearchProductsActions } from "./action";
import produce from "immer";

export interface ProductSearchState {
    productList: SearchProduct[]
    categories: CategoriesFilter[]
}

const initialState: ProductSearchState = {
    productList: [],
    categories: []
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
            case "@@products/LOAD_PRODUCT_CATEGORIES":
                newState.categories = action.categories
        }
    })
}

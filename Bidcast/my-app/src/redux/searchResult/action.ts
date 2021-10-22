import { RootState, RootThunkDispatch } from "../../store";
import { Product } from "../products/actions";

// export interface SearchProduct {
//     productList: Product[]
// }

//load product search result
export function loadProductSearchResult(productList: Product[]) {
    return {
        type: "@@products/LOAD_PRODUCT_SEARCH_RESULT" as const,
        productList,
    }
}

export type SearchProductsActions = ReturnType<typeof loadProductSearchResult>;

export function fetchProductSearchResult(searchKeywords: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await fetch(`
            ${process.env.REACT_APP_BACKEND_URL}/product/search
            `, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({searchKeywords})
            })

            const json = await res.json();

            dispatch(loadProductSearchResult(json.data.results.rows))
        } catch (error) {
            console.log(error);
        }
    }
}
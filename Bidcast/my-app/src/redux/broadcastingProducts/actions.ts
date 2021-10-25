import { RootState, RootThunkDispatch } from "../../store"

export interface BroadcastingProducts {
    id: number;
    title: string;
    current_price: number;
    username: string;
    product_name: string;
    image: string;
}

export function loadBroadcastingProducts (
    broadcastingProducts: BroadcastingProducts []
) {
    return {
        type: "@@products/LOAD_BROADCASTING_PRODUCTS" as const,
        broadcastingProducts,
    }
}

export type BroadcastingProductActions = ReturnType<typeof loadBroadcastingProducts>

export function fetchBroadcastingProducts () {
    return async (dispatch: RootThunkDispatch, getState: ()=> RootState)=> {
        try {
            const res = await fetch (
                `${process.env.REACT_APP_BACKEND_URL}/broadcastingProduct`
            )
            const json = await res.json()
            
            if(json) {
                dispatch(loadBroadcastingProducts(json.data.results.rows))
            } else {
                dispatch(loadBroadcastingProducts([]))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}
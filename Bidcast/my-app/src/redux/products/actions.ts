import { RootState, RootThunkDispatch } from "../../store";
import { Dispatch } from "react";


export interface Product {
    id: number;
    product_name: string;
    live_id: number;
    seller_od: number;
    min_price: number;
    current_price: number;
    buy_price: number;
    bidIncrement: number;
    buyer_id: number;
    category_id: number;
    product_image: string;
    is_selected: boolean;
    countdown_start_time: Date;
    duration: number;
    is_ended: boolean;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
}

export interface Category {
    id: number;
    category: string;
    created_at:Date;
    updated_at:Date;
    productIds: number[]; //分類頁面用 or do it with knex?
}

// Action creator
export function loadCategories(categories:Category[]){
    return {
        type: '@@products/LOAD_CATEGORIES' as const,
        categories
    }
}

export function loadProduct(products:Product[],categoryId:number){
    return {
        type: '@@products/LOAD_PRODUCTS' as const,
        products,
        categoryId
    }
}

export type ProductsActions =    ReturnType<typeof loadCategories> |
                                ReturnType<typeof loadProduct>

// Thunk action creator (fetch)

export function fetchCategories() {
    return async(dispatch:  RootThunkDispatch, getState: () => RootState)=>{
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`)
        const json = await res.json();
        const categoriesData = json.data.results;
        console.log("json", categoriesData);

        // for(let category of json) {
        //  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${category.id}/products`)   
        //  const productJson = await res.json();

        //  dispatch(loadProduct(productJson, category.id));
        // }
        dispatch(loadCategories(categoriesData));
    }
}
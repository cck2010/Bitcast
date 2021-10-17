export interface Product {
    id: number;
    name: string;
    latestBid: number;
    deadline: number; // timestamp
    image: string; // url
    minimumBid: number;
    eachBidAmount: number;
    username: string;
    categoryId: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    order: number;
    productIds: number[];
  }
  
  export interface ProductsState {
    products: {
      [id: string]: Product
    };
    categories: {
      [id: string]: Category
    },
  }

  const initialState: ProductsState = {
    products: {},
    categories: {
      '1': {
        id: 1,
        name: '電子產品',
        order: 99,
        productIds: [1, 2]
      },
      '2': {
        id: 1,
        name: '時尚服飾',
        order: 1,
        productIds: [3, 4]
      },
    }
  }


  export function productsReducer(state: ProductsState = initialState): ProductsState {
    return initialState
  }
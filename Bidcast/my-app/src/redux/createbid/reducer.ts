export interface Bid {
    productId: number;
    amount: number;
    finish: boolean;
    success: boolean;
  }

  export interface CreateBids {
      bids: Bid[];
  }

  const initialState = {
      bids: []
  }

  export function createBidsReducer(state: CreateBids = initialState): CreateBids {
      return initialState;
  }


  
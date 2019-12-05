import { GET_IN_ORDERS, GET_OUT_ORDERS } from "./../actions/types";

const initialState = {
    inOrders: [],
    outOrders: []
}


const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IN_ORDERS:
            return {
                ...state,
                inOrders: action.payload
            }

        case GET_OUT_ORDERS:
            return {
                ...state,
                outOrders: action.payload
            }
        default: {
            return state;
        }
    }
}

export default orderReducer;
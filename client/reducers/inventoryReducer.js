import { UPDATE_INVENOTRY_ERR, UPDATE_INVENTORY, GET_INVENTORY, GET_INVENTORY_ERR } from "../actions/types"

const initialState = {
    inventoryError: false,
    items: []
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INVENTORY:
            console.log(action.payload)
            return {
                ...state,
                inventoryError: false
            }
        case UPDATE_INVENOTRY_ERR:
            return {
                ...state,
                inventoryError: true
            }
        case GET_INVENTORY: 
            return{
                ...state,
                items: action.payload
            }
        case GET_INVENTORY_ERR:
            return{
                ...state,
                inventoryError: true
            }
        default: {
            return state
        }
    }
}

export default inventoryReducer
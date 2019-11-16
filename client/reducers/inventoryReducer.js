import { UPDATE_INVENOTRY_ERR, UPDATE_INVENTORY } from "../actions/types"

const initialState = {
    inventoryError: false
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INVENTORY:
            return {
                ...state,
                inventoryError: false
            }
        case UPDATE_INVENOTRY_ERR:
            return {
                ...state,
                inventoryError: true
            }
        default: {
            return state
        }
    }
}

export default inventoryReducer
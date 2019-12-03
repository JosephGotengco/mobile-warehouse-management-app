import { UPDATE_INVENOTRY_ERR, UPDATE_INVENTORY, GET_INVENTORY, GET_INVENTORY_ERR } from "../actions/types"

const initialState = {
    inventoryError: false,
    items: [
        {
            "tags": [
                "fruit",
                "food"
            ],
            "_id": "5dd42ed7c62bba3b68200de0",
            "id": 1,
            "name": "Apple",
            "quantity": 35,
            "__v": 0
        }
    ]

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
            return {
                ...state,
                items: action.payload
            }
        case GET_INVENTORY_ERR:
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
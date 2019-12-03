import { GET_NUM_OF_USERS } from "./../actions/types";

const initialState = {
    numOfUsers: 0
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NUM_OF_USERS:
            return {
                ...state,
                numOfUsers: action.payload
            }

        default: {
            return state;
        }
    }
}

export default userReducer;
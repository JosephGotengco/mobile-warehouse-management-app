import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./../actions/types";

const initialState = {
    loggedIn: false,
    user: {}
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            }

        case REGISTER_FAIL:
            return {
                ...state
            }

        default: {
            return state;
        }
    }
}

export default authReducer;
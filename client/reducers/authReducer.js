import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_ON_FAILED_LOGIN,
    RESET_ON_FAILED_REGISTER,
    UPDATE_USER,
} from "./../actions/types";

const initialState = {
    loggedIn: false,
    loginErr: false,
    loginErrMsg: "",
    registerErr: false,
    registerErrMsg: "",
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
                ...state,
                loginErr: true,
                loginErrMsg: action.payload
            }

        case RESET_ON_FAILED_LOGIN:
            return {
                ...state,
                loginErr: false
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.payload
            }

        case REGISTER_FAIL:
            return {
                ...state,
                registerErr: true,
                registerErrMsg: action.payload
            }

        case RESET_ON_FAILED_REGISTER:
            return {
                ...state,
                registerErr: false
            }

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }

        default: {
            return state;
        }
    }
}

export default authReducer;
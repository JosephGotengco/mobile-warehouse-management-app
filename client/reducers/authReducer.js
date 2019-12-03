import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_ON_FAILED_LOGIN,
    RESET_ON_FAILED_REGISTER,
    UPDATE_USER,
    LOGOUT_USER,
} from "./../actions/types";

const initialState = {
    loggedIn: true,
    loginErr: false,
    loginErrMsg: "",
    registerErr: false,
    registerErrMsg: "",
    user: {
        "registrationDate": "2019-11-17T06:02:07.323Z",
        "_id": "5dd0e27abd21d35678740e39",
        "firstName": "first",
        "lastName": "last",
        "username": "1",
        "email": "1",
        "phone": "phone",
        "shifts": {
            "1577644200000": {
                "date": "2019-11-29",
                "startTime": "10:30",
                "endTime": "13:31"
            }
        }
    }
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                loggedIn: false,
            }

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
                user: Object.assign({}, action.payload)
            }

        default: {
            return state;
        }
    }
}

export default authReducer;
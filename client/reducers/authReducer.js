import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./../actions/types";

const initialState = {
    loggedIn: true,
    user: {
        "_id": "5dc79195a986f50b2cc61a1e",
        "email": "1",
        "firstName": "first",
        "lastName": "last",
        "phone": "phone",
        "registrationDate": "2019-11-10T04:26:37.771Z",
        "shifts": {
            "1573509000000": {
                "startTime": "13:50",
                "endTime": "14:50"
            },
            "1576101000000": {
                "startTime": "13:50",
                "endTime": "14:50"
            },
            "1576014600000": {
                "startTime": "13:50",
                "endTime": "14:50"
            }
        },
        "username": "1",
    }
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
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_ON_FAILED_LOGIN
} from "./../actions/types";

const initialState = {
  loggedIn: false,
  loginErr: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loginErr: true
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case RESET_ON_FAILED_LOGIN:
      return {
        ...state,
        loginErr: false
      };
    case REGISTER_FAIL:
      return {
        ...state
      };

    default: {
      return state;
    }
  }
};

export default authReducer;

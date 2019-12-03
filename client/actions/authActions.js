import axios from 'axios';
import * as Constants from './../constants'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_ON_FAILED_LOGIN,
    RESET_ON_FAILED_REGISTER,
    LOGOUT_USER,
} from './types';

export const resetFailedLogin = () => dispatch => {
    dispatch({
        type: RESET_ON_FAILED_LOGIN
    })
}

export const signIn = (email, password) => {
    // ASYNC action creator
    return (dispatch, getState) => {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        // Request body
        const body = JSON.stringify({
            username: email,
            password
        });
        console.log("Trying to login...")
        return axios
            .post(`${Constants.BASEURL}/api/auth/`, body, config)
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                if (err.isAxiosError && !err.response) {
                    // default login error
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: "There was an error logging you in. Please check you have internet access."
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: err.response.data
                    });
                }
            })
    }
}

export const resetFailedSignUp = () => dispatch => {
    dispatch({
        type: RESET_ON_FAILED_REGISTER
    })
}

export const signUp = ({ firstName, lastName, phone, email, password, confirmPassword }) => {
    return (dispatch, getState) => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        // Request body
        const body = JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword
        });
        return axios
            .post(`${Constants.BASEURL}/api/users/`, body, config)
            .then(res => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('err', err.response.status);
                if (err.isAxiosError && !err.response) {
                    // default login error
                    dispatch({
                        type: REGISTER_FAIL,
                        payload: "There was an error logging you in. Please check you have internet access."
                    });
                } else {
                    dispatch({
                        type: REGISTER_FAIL,
                        payload: err.response.data
                    });
                }
            })
    }
}

export const logout = () => dispatch => {
    axios
        .post(`${Constants.BASEURL}/api/auth/logout`)
        .then(res => {
            dispatch({ type: LOGOUT_USER, payload: res.data })
        })
}
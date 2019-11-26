import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, RESET_ON_FAILED_LOGIN } from './types';

// const API_URL = "http://10.0.2.2:5000"
const API_URL = "https://warehouse-management-api.herokuapp.com"
// const API_URL = "http://142.232.148.252:5000"

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
            .post(`${API_URL}/api/auth/`, body, config)
            .then(res => {
                console.log('res', res.data)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
                if (err.response.data == undefined){
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: err
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: err.response
                    })
                }
            })
    }
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
            .post(`${API_URL}/api/users/`, body, config)
            .then(res => {
                console.log('res', res.data)
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('err', err.response.status)
                console.log('err msg', err.response.data)
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.response
                })
            })
    }
}
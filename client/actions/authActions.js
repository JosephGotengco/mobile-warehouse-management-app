import axios from 'axios';
import * as Constants from './../constants'

import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
        
        console.log(body)

        return axios
            .post(`${Constants.BASEURL}/api/auth/`, body, config)
            .then(res => {
                console.log('res', res.data)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('err', err.response.status)
                console.log('err msg', err.response.data)
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response
                })
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
            .post(`${Constants.BASEURL}/api/users/`, body, config)
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
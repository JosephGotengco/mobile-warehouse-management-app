import axios from 'axios';
import * as Constants from './../constants'

import {
    GET_NUM_OF_USERS
} from './types';


export const getNumOfUsers = () => dispatch => {
    axios
        .get(`${Constants.BASEURL}/api/users/length`)
        .then(res => {
            dispatch({ type: GET_NUM_OF_USERS, payload: res.data });
            console.log(res.data);
        })
}

export const updateUserProfilePicture = data => dispatch => {
    try {
        console.log('body', data)
        axios
            .put(`${Constants.BASEURL}/api/users`, data, {
                'Content-type': 'multipart/form-data',
            })
            .then(response => {
                console.log("upload success", response);
                alert("Upload success!");
            })
            .catch(error => {
                console.log(error)
                alert("Upload failed!");
            });
    } catch (e) {
        console.log(e)
    }
}
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
    axios
        .put('/api/users', { ...data })
        .then(response => response.json())
        .then(response => {
            console.log("upload success", response);
            alert("Upload success!");
        })
        .catch(error => {
            console.log("upload error", Object.keys(error.toJSON()));
            alert("Upload failed!");
        });

}
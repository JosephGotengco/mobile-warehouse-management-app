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
import axios from "axios";
import { ADDING_SHIFT, ADDED_SHIFT_SUCCESSFUL, ADDED_SHIFT_FAILURE, UPDATE_USER } from "./types";
import * as Constants from './../constants'

export const addShift = (year, month, date, startTime, endTime) => dispatch => {
    dispatch({ type: ADDING_SHIFT })
    let dateString = `${year}-${month}-${date}`;
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const body = {
        date: dateString,
        startTime,
        endTime
    }
    axios
        .post(`${Constants.BASEURL}/api/shifts`, body, config)
        .then(res => {
            let { user, msg } = res.data;
            console.log(msg);
            dispatch({
                type: UPDATE_USER,
                payload: user
            })
            dispatch({
                type: ADDED_SHIFT_SUCCESSFUL,
            })
            // console.log(res.data)
        }).catch(err => {
            dispatch({
                type: ADDED_SHIFT_FAILURE,
            })
            console.log(err.response.data)
        })
}
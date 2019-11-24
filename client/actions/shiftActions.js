import axios from "axios";
import { ADDING_SHIFT, ADDED_SHIFT_SUCCESSFUL, ADDED_SHIFT_FAILURE } from "./types";
import * as Constants from './../constants'

export const addShift = (year, month, date, startTime, endtime) => dispatch => {
    dispatch({ type: ADDING_SHIFT })
    let date = `${year}-${month}-${date}`;
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const body = {
        date,
        startTime,
        endTime
    }
    axios
        .post(`${Constants.BASEURL}/api/shifts`, body, config)
        .then(res => {
            dispatch({
                type: ADDED_SHIFT_SUCCESSFUL,
            })
            console.log(res.data)
        }).catch(err => {
            dispatch({
                type: ADDED_SHIFT_FAILURE,
            })
            console.log(err.response.data)
        })
}
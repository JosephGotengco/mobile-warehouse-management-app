import axios from "axios";
import { ADDING_SHIFT, UPDATE_USER, SET_SHIFT_MSG } from "./types";
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
            console.log('msg', msg);
            dispatch({
                type: UPDATE_USER,
                payload: user
            })
            dispatch({
                type: SET_SHIFT_MSG,
                payload: msg
            })
        }).catch(err => {
            dispatch({
                type: SET_SHIFT_MSG,
                payload: err.response.data
            })
            console.log('err', err.response.data)
        })
}

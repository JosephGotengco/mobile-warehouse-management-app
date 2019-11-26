import axios from "axios";
import { UPDATE_USER, ADDING_SHIFT_SUCCESS, ADDING_SHIFT_FAIL, DELETING_SHIFT_SUCCESS, DELETING_SHIFT_FAIL, RESET_ON_FAILED_SHIFT_ADD, RESET_ON_FAILED_SHIFT_DELETE } from "./types";
import * as Constants from './../constants'

export const addShift = (year, month, date, startTime, endTime) => {
    return (dispatch, getState) => {
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
        return axios
            .post(`${Constants.BASEURL}/api/shifts`, body, config)
            .then(res => {
                let { user, msg } = res.data;
                console.log('msg', msg);
                dispatch({
                    type: UPDATE_USER,
                    payload: user
                })
                dispatch({
                    type: ADDING_SHIFT_SUCCESS,
                    payload: msg
                })
            }).catch(err => {
                dispatch({
                    type: ADDING_SHIFT_FAIL,
                    payload: err.response.data
                })
                console.log('err', err.response.data)
            })
    }

}

export const deleteShift = key => dispatch => {
    axios
        .delete(`${Constants.BASEURL}/api/shifts/${key}`, body, config)
        .then(res => {
            let { user, msg } = res.data;
            console.log('msg', msg);
            dispatch({
                type: UPDATE_USER,
                payload: user
            })
            dispatch({
                type: DELETING_SHIFT_SUCCESS,
                payload: msg
            })
        }).catch(err => {
            dispatch({
                type: DELETING_SHIFT_FAIL,
                payload: err.response.data
            })
            console.log('err', err.response.data)
        })
}

export const resetFailedShiftAdd = () => dispatch => {
    dispatch({
        type: RESET_ON_FAILED_SHIFT_ADD
    })
}

export const resetFailedShiftDelete = () => dispatch => {
    dispatch({
        type: RESET_ON_FAILED_SHIFT_DELETE
    })
}
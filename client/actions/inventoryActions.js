import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";
import * as Constants from './../constants'

export const addItem = data => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const body = data
    axios
        .post(`${Constants.BASEURL}/api/inventory/add`, body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: UPDATE_INVENTORY,
                payload: res.data })
        }).catch(res => {
            dispatch({
                type: UPDATE_INVENOTRY_ERR
            })
        })
}
import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";
import * as Constants from './../constants'

export const addItem = data => dispatch => {

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = data
    axios
        .post(`${Constants.BASEURL}/api/inventory/add`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_INVENTORY,
                payload: res.data})
        }).catch(res => {
            dispatch({
                type: UPDATE_INVENOTRY_ERR
            })
        })
}

export const getInventory = () => dispatch => {
    axios.get(`${API_URL}/api/inventory/all`)
    .then(res => {
        dispatch({
            type: GET_INVENTORY,
            payload: res.data.items
        })
    }).catch(res=>{
        dispatch({
            type: GET_INVENTORY_ERR
        })
    })
}
import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";

// const API_URL = "http://10.0.2.2:5000"
// const API_URL = "https://warehouse-management-api.herokuapp.com"
const API_URL = "http://192.168.86.78:5000"

export const addItem = data => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const body = data
    axios
        .post(`${API_URL}/api/inventory/add`, body, config)
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
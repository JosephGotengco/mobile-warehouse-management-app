import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";

export const addItem = data => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const body = data
    console.log(typeof (body))

    axios
        .post(`https://warehouse-management-api.herokuapp.com/api/inventory/add`, body, config)
        .then(res => {
            console.log('qr api res', res.data);
            dispatch({ type: UPDATE_INVENTORY, payload: res.data })
        }).catch(res => {
            console.log(res)
        })



}
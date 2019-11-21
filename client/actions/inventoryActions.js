import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR, GET_INVENTORY, GET_INVENTORY_ERR, GET_ITEM, GET_ITEM_ERR} from "./types";

// const API_URL = "http://10.0.2.2:5000"
// const API_URL = "https://warehouse-management-api.herokuapp.com"
const API_URL = "http://192.168.56.1:5000"

// Headers

export const addItem = data => dispatch => {

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = data
    axios
        .post(`${API_URL}/api/inventory/add`, body, config)
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
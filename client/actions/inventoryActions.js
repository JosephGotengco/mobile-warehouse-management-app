import axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";

export const addItem = (data) => {
    // ASYNC action creator
    return (dispatch, getState) => {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        const body = JSON.parse(data)

        return axios
        .post(`http://10.0.2.2:5000/api/inventory/add`, body, config)
        .then(res => {
            console.log(res)
        }).catch(res => {
            console.log(res)
        })
    }

    
}
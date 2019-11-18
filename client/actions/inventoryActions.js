import Axios from "axios";
import { UPDATE_INVENTORY, UPDATE_INVENOTRY_ERR } from "./types";

export const addItem = (data) => {
    console.log("Here at inventoryActions.js")
    // ASYNC action creator
    return (dispatch, getState) => {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        const body = data
        console.log(typeof(body))

        // return Axios
        // .post(`http://10.0.2.2:5000/api/inventory/add`, body, config)
        // .then(res => {
        //     console.log(res.data)
        // }).catch(res => {
        //     console.log(res)
        // })
    }

    
}
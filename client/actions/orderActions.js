import axios from "axios";
import { GET_IN_ORDERS, GET_IN_ORDERS_ERR, GET_OUT_ORDERS, GET_OUT_ORDERS_ERR } from "./types";
import * as Constants from './../constants'

export const getInOrders = () => dispatch => {
    axios
        .get(`${Constants.BASEURL}/api/orders/in`)
        .then(res => {
            dispatch({ type: GET_IN_ORDERS, payload: res.data });
        })
        .catch(e => {
            dispatch({ type: GET_IN_ORDERS_ERR, payload: e.response.data });
        })
}

export const getOutOrders = () => dispatch => {
    axios
        .get(`${Constants.BASEURL}/api/orders/out`)
        .then(res => {
            console.log(res.data);
            dispatch({ type: GET_OUT_ORDERS, payload: res.data });
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: GET_OUT_ORDERS_ERR, payload: e.response.data });
        })
}

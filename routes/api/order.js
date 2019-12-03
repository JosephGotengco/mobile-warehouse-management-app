const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const SystemVariables = require("../../models/SystemVariables");

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

const initializeSystemVariables = (req, res, next) => {
    try {
        // checks if there are initial values for the system variables table
        SystemVariables.find({}, (err, results) => {
            if (results.length === 0) {
                let variables = [{ id: 1, keyName: "orderId", theValue: 0 }, { id: 2, keyName: "itemId", theValue: 0 }];
                SystemVariables.create(variables, (err, result) => {
                    next();
                })
            } else {
                next();
            }
        });
    } catch (e) {
        console.log(e);
        next();
    }
}

let getNextId = async (systemVariableId) => {
    // returns the next id for a document (DOES NOT UPDATE IT, JUST RETURNS THE NEXT ONE);
    try {
        let result = await SystemVariables.find({ id: systemVariableId });
        let document = result[0];
        let currentId = document.theValue;
        await SystemVariables.updateOne({ id: systemVariableId }, { $inc: { theValue: 1 } });
        return currentId + 1;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const isValidDate = dateString => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

const isValidTime = timeString => {
    var regEx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeString.match(regEx)) return false;  // Invalid format
    return true
}

const checkType = type => {
    if (type !== "in" && type !== "out") return true
    return false 
}

router.post('/add', initializeSystemVariables, async (req, res) => {
    try {
        const { date, time, items, type } = req.body;
        if (!date || !time || !items || !type) return res.status(400).send(`Please fill out all the fields.`);
        if (items.length < 1) return res.status.send(`You must specify at least one item.`);
        if (!isValidDate(date)) return res.status(400).send("Please provide a valid date.");
        if (!isValidTime(time)) return res.status(400).send("Please provide a valid time.");
        if (checkType(type)) return res.status(400).send("Please provide either 'in' or 'out' for the type field.");
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let { id, name, quantity, tags } = item;
            if (tags.length < 1) return res.status(400).send(`Each item must have at least one tag in the tags array.`);
            if (!id || !name || !quantity || !tags) return res.status(400).send(`Malformed items list. Each item object must have an id, name, quantity, and a tags field.`)
        }
        let newOrderId = await getNextId(1);
        Order.create({
            id: newOrderId,
            date,
            time,
            items,
            type
        })
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/in', async(req, res) => {
    try {
        let allOrders = await Order.find({});
        let inOrders = allOrders.filter(order => {return order.type === 'in'});
        res.status(200).send(inOrders);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/out', async(req, res) => {
    try {
        let allOrders = await Order.find({});
        let inOrders = allOrders.filter(order => {return order.type === 'out'});
        res.status(200).send(inOrders);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

module.exports = router
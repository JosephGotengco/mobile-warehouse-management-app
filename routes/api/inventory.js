const express = require("express");
const router = express.Router();
const Inventory = require("../../models/Inventory");
const Item = require("../../models/Item")
const User = require("../../models/User")

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

router.post('/add', (req, res, next) => {
    try {
        // res.status(200).send({...req.body})
        const { id, name, quantity } = req.body;
        if (!id || !name || !quantity ) {return res.status(400).send("Invalid QR Code")}
        Item.findOne({id: id})
            .then(item => {
                if (item) {
                    return res.status(200).send("Item found in database")
                } else {
                    res.send("Trying to create object in collection...")
                    Item.create({
                        id: id,
                        name: name,
                        quantity: quantity
                    })
                }
            })
    } catch (error) {
        console.log("Error: ", error)
        res.send(error)
    }
})

router.put('/remove', isLoggedIn, (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
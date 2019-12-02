const express = require("express");
const router = express.Router();
const Item = require("../../models/Item")

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

//Adds items to database based on QR Code data.
router.post('/add', isLoggedIn, (req, res, next) => {
    try {
        console.log(req.user)
        const { id, name, quantity, tags } = req.body;
        if (!id || !name || !quantity) { return res.status(400).send("Invalid QR Code") }
        Item.findOne({ id: id })
            .then(item => {
                if (item) {
                    res.send("Item found. Trying to update quantity...")
                    Item.updateOne({ id: id }, { $inc: { quantity: quantity } }, function (err, response) {
                        if (err) return res.send(err)
                    })
                } else {
                    res.send("Trying to create object in collection...")
                    Item.create({
                        id: id,
                        name: name,
                        quantity: quantity,
                        tags: tags
                    })
                }
            })
    } catch (error) {
        console.log("Error: ", error)
        res.send(error)
    }
})

//Remove an item from database
router.put('/remove', isLoggedIn, (req, res, next) => {
    try {
        const { id, name, quantity } = req.body
        if (!id || !name || !quantity) { return res.status(400).send("Invalid QR Code") }
        try {
            Item.findOne({ id: id })
            .then(item => {
                if (item) {
                    res.send("Item found. Trying to update quantity...")
                    Item.updateOne({ id: id }, { $inc: { quantity: -quantity } }, function (err, response) {
                        if (err) return res.send(err)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
})

//Get all items in database
router.get('/all', isLoggedIn, (req, res, next) => {
    try {
        Item.find().then(items => {
            if (items) {
                return res.status(200).send({ items })
            } else {
                return res.status(404).send("Unable to connect to database")
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
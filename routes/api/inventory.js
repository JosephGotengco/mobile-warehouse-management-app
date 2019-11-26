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
router.post('/add', (req, res, next) => {
    try {
        // res.status(200).send({...req.body})
        const { id, name, quantity, tags } = req.body;
        console.log(typeof(id), typeof(name), typeof(quantity))
        if (!id || !name || !quantity ) {return res.status(400).send("Invalid QR Code")}
        Item.findOne({id: id})
            .then(item => {
                if (item) {
                    res.send("Item found. Trying to update quantity...")
                    Item.updateOne({id: id}, {$inc: {quantity: quantity}}, function(err, response ){
                        if (err) return res.send(err)
                    })
                } else {
                    res.send("Item not found. Trying to create object in collection...")
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

router.put('/remove', isLoggedIn, (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
})

//Get all items in database
router.get('/all', (req, res, next) => {
    try {
        Item.find().then(items => {
            if (items) {
                return res.status(200).send({items})
            } else {
                return res.status(404).send("Unable to connect to database")
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

router.post('/add', isLoggedIn, (req, res, next) => {
    try {
        res.status(200).json({...req.body})
    } catch (error) {
        
    }

})

router.put('/remove', isLoggedIn, (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
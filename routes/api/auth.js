const express = require("express");
const router = express.Router();
const passport = require("passport");

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

// @route   POST api/auth
// @desc    Authenticates a user, should be called everytime you need user data
// @access  Public
router.post(
    "/",
    (req, res, next) => {
        passport.authenticate("local", (err, user) => {
            if (err) { return next(err); }
            if (!user) { return res.status(400).send("Invalid username or password."); }
            if (user) {
                req.login(user, (err) => {
                    if (err) { return next(err); }
                    return res.status(200).json({ ...user });
                });
            }
        })(req, res, next)
    }
);


// @route   GET api/auth/user
// @desc    Get user data, only if they have a sesssion
// @access  Private
router.get("/user", isLoggedIn, (req, res) => {
    res.status(200).json({ ...req.user })
});

// @route   POST api/auth/logout
// @desc    Logs user out, deletes session
// @access  Private
router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.status(200).send("You have been logged out.");
});

module.exports = router;

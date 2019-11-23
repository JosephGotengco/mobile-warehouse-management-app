const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// @route   POST api/users
// @desc    Registers New User
// @access  Public
router.post("/", (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    } = req.body;
    // Simple Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send("Please fill out all the fields.");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    // Check for existing user
    User.findOne({ username: email }).then(user => {
      if (user)
        return res.status(400).send("A user with that email already exists.");

      const newUser = new User({
        firstName,
        lastName,
        password,
        username: email,
        email,
        phone
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            let {
              id,
              firstName,
              lastName,
              email,
              phone,
              registrationDate
            } = user;
            res.json({
              user: {
                id,
                firstName,
                lastName,
                email,
                phone,
                registrationDate
              }
            });
          });
        });
      });
    });
  } catch (e) {
    res.status(400);
    console.log("error", e);
  }
});

module.exports = router;

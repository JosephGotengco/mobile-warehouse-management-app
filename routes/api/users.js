const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})


const upload = multer({ storage: storage });


const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

// @route   POST api/users
// @desc    Registers New User
// @access  Public
router.post("/", (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword } = req.body;
        // Simple Validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).send("Please fill out all the fields.");
        }
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match.")
        }

        // Check for existing user
        User.findOne({ username: email }).then(user => {
            if (user) return res.status(400).send("A user with that email already exists.");

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
                        let { id, firstName, lastName, email, phone, registrationDate } = user;
                        req.login(user, (err) => {
                            if (err) return res.status(400).send("There was an error registering your account.");
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
                        })
                    });
                });
            });

        });
    } catch (e) {
        res.status(400)
        console.log("error", e)
    }
});

router.put('/', upload.single('photo'), (req, res) => {
    console.log('file', req.files)
    console.log('body', req.body)
    res.status(200).json({
        message: 'success!',
    })
})

router.get('/length', async (req, res) => {
    try {
        let result = await User.find({});
        let numOfUsers = result.length;
        res.status(200).send('' + numOfUsers);
    } catch (e) {
        console.log(e)
    }
});



module.exports = router;

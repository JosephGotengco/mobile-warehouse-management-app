const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require('multer')
const fs = require('fs')

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);
        }
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())

    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const isLoggedIn = (req, res, next) => {
    // checks if user is logged in
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
}

router.put('/', [isLoggedIn, upload.single('photo')], async(req, res) => {
    console.log('body', req.body)
    var result = await User.find({ _id: req.user._id });
    let user = result[0];
    console.log('req.file', req.file)
    console.log('req.file.path', req.file.path)
    user.img.data = fs.readFileSync(req.file.path)
    console.log(result)
    res.status(200).json({
        message: 'success!',
    })
})
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

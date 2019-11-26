const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("./passport.js")(passport);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((error, req, res, next) => {
  // Called when body is malformed e.g. extra comma or a key with no value
  if (error instanceof SyntaxError) {
    res.status(400).send("Invalid JSON.");
  } else {
    next();
  }
});
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.set("trust proxy", "loopback");

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/shifts", require("./routes/api/shifts"));
app.use("/api/inventory", require("./routes/api/inventory"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

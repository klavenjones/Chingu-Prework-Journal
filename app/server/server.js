/* 
    EXPRESS SETUP
*/

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const passport = require("passport");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const config = require("./config");

/*
=============================================
EXPRESS SERVER SETUP - DATABASE
=============================================
*/
const DB = require("./config/database");
mongoose.connect(DB.url, { useNewUrlParser: true });

/*
=============================================
EXPRESS SERVER SETUP - MIDDLEWARE
=============================================
*/

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// read cookies (needed for auth)
app.use(cookieParser());

/*
=============================================
PASSPORT SETUP - MIDDLEWARE
=============================================
*/

require("./config/passport")(passport);

// required for passport
app.use(
  session({
    secret: config.secret, // session secret
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//ROUTES
const user = require("./routes/UserRoutes");
const post = require("./routes/PostRoutes");

app.use("/user", user);
app.use("/post", post);

app.listen(port, () => console.log(`Server running on port ${port}`));

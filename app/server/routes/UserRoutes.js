const express = require("express");
const router = express.Router();
const passport = require("passport");
//BRING IN CONTROLLERS
const UserController = require("../controllers/UserController.js");
//MIDDLEWARE
const middleWare = require("../middleware");

/*
 * GET
 */

//GET USER
router.get("/", middleWare.isLoggedIn, UserController.loggedIn);
//GET A LIST OF USERS
router.get("/all", UserController.list);
//SHOW USER
router.get("/:id", UserController.show);

/*
 * POST
 */
//CREATE A USER
router.post("/create", UserController.create);

//LOG USER IN
router.post("/login", passport.authenticate("local-login"), (req, res) => {
  res.status(200).json(req.user);
});

//LOG USER OUT
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("LOGGED OUT");
  }
});

module.exports = router;

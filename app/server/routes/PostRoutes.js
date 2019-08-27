const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController.js");

const middleWare = require("../middleware");

/*
 * GET
 */

//GET ALL POSTS
router.get("/all", PostController.list);
//SHOW POST
router.get("/:id", PostController.show);
//CREATE POST
router.post("/create", middleWare.isLoggedIn, PostController.create);
/*
 * PUT
 */
//UPDATE POST
router.put("/:id", middleWare.checkPostOwnerShip, PostController.update);
/*
 * DELETE
 */
//DELETE POST
router.delete("/:id", middleWare.checkPostOwnerShip, PostController.remove);

module.exports = router;

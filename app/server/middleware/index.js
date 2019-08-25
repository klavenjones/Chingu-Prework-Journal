const Post = require("../models/PostModel");
module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send("UAUTHORIZED");
    }
  },
  checkPostOwnerShip: (req, res, next) => {
    if (req.isAuthenticated()) {
      Post.findById(req.params.id)
        .then(post => {
          if (post.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect("back");
          }
        })
        .catch(err => {
          return res
            .status(400)
            .json({
              message: "You don't have permission to do that",
              error: err
            });
        });
    } else {
      res.send("UAUTHORIZED");
    }
  }
};

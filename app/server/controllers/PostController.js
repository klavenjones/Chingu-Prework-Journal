const PostModel = require("../models/PostModel.js");
const UserModel = require("../models/UserModel");
/**
 * PostController.js
 *
 * @description :: Server-side logic for managing Posts.
 */
module.exports = {
  /**
   * PostController.list()
   */
  list: function(req, res) {
    PostModel.find(function(err, Posts) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Post.",
          error: err
        });
      }
      return res.json(Posts);
    });
  },

  /**
   * PostController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    PostModel.findOne({ _id: id }, function(err, Post) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Post.",
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: "No such Post"
        });
      }
      return res.json(Post);
    });
  },

  /**
   * PostController.create()
   */
  create: function(req, res) {
    UserModel.findOne({ _id: req.user.id }).then(user => {
      const Post = new PostModel({
        text: req.body.text,
        title: req.body.title,
        author: {
          id: user._id,
          name: user.name
        }
      });
      user.posts.push(Post);
      Post.save()
        .then(post => {
          user
            .save()
            .then(saved => {
              res.status(201).json(Post);
            })
            .catch(err => {
              return res.status(500).json({
                message: "Error when getting Post",
                error: err
              });
            });
        })
        .catch(err => {
          return res.status(500).json({
            message: "Error when getting Post",
            error: err
          });
        });
    });
  },
  /**
   * PostController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    PostModel.findOne({ _id: id }, function(err, Post) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Post",
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: "No such Post"
        });
      }

      Post.text = req.body.text ? req.body.text : Post.text;
      Post.title = req.body.title ? req.body.title : Post.title;
      Post.author = req.body.author ? req.body.author : Post.author;

      Post.save(function(err, Post) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Post.",
            error: err
          });
        }

        return res.json(Post);
      });
    });
  },

  /**
   * PostController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    PostModel.findByIdAndRemove(id, function(err, Post) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Post.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};

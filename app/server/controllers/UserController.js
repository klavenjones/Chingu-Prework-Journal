var UserModel = require("../models/UserModel.js");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.list()
   */
  list: function(req, res) {
    UserModel.find()
      .then(Users => res.json(Users))
      .catch(err => {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err
        });
      });
  },

  /**
   * UserController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({ _id: id })
      .populate("posts")
      .then(User => {
        if (!User) {
          return res.status(404).json({
            message: "No such User"
          });
        }
        return res.json(User);
      })
      .catch(err => {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err
        });
      });
  },
  /**
   * UserController.isLoggedIn()
   */
  loggedIn: function(req, res) {
    if (req.user) {
      let id = req.user._id;
      UserModel.findOne({ _id: id })
        .populate("posts")
        .then(User => {
          if (!User) {
            return res.status(404).json({
              message: "No such User"
            });
          }
          return res.status(200).json({ user: User });
        })
        .catch(err => {
          return res.status(500).json({
            message: "Error when getting User.",
            error: err
          });
        });
    } else {
      res.status(404).json({ user: null });
    }
  },

  /**
   * UserController.create()
   */
  create: function(req, res) {
    UserModel.findOne({ email: req.body.email })
      .then(User => {
        if (User) {
          return res
            .status(400)
            .json({ message: "Email already taken, please try another" });
        } else {
          var newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: UserModel.generateHash(req.body.password)
          });

          newUser
            .save()
            .then(User => res.status(201).json(User))
            .catch(err => {
              return res.status(500).json({
                message: "Error when creating User",
                error: err
              });
            });
        }
      })
      .catch(err => {
        return res.status(500).json({
          message: "Error when creating User",
          error: err
        });
      });
  },

  /**
   * UserController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({ _id: id })
      .then(User => {
        if (!User) {
          return res.status(404).json({
            message: "No such User"
          });
        }
        User.name = req.body.name ? req.body.name : User.name;
        User.email = req.body.email ? req.body.email : User.email;
        User.password = req.body.password ? req.body.password : User.password;

        User.save()
          .then(User => res.json(User))
          .catch(err => {
            return res.status(500).json({
              message: "Error when updating User.",
              error: err
            });
          });
      })
      .catch(err => {
        return res.status(500).json({
          message: "Error when getting User",
          error: err
        });
      });
  },

  /**
   * UserController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    UserModel.findByIdAndRemove(id)
      .then(User => res.status(204).json())
      .catch(err =>
        res.status(500).json({
          message: "Error when deleting the User.",
          error: err
        })
      );
  }
};

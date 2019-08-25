const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

UserSchema.statics.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validatePassword = function validatePassword(pass) {
  return bcrypt.compareSync(pass, this.password);
};

module.exports = mongoose.model("User", UserSchema);

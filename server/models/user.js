const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function setPassword(value) {
  return bcrypt.hashSync(value, 10); // creating a secure pwd with bcrypt and 10 salt rounds
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "can't be blank"], //  email needs to be set - validation happens on the client already 
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'] //validating email - this happens on the client already
  },
  password: {
    type: String,
    required: true,
    set: setPassword
  }
}); // setting up user model with password and email

const model = mongoose.model("User", UserSchema);

module.exports = model;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "can't be blank"],
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    set: setPassword
  }
});

const model = mongoose.model("User", UserSchema);

module.exports = model;
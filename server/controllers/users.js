const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

const send_success = function(res, user, token = {}, message = ''){
  res.json({
    user,
    token,
    message: message
  });
}

const send_error = function(res, error){
  res.json({
    message: `couldn't create user`,
    error
  });
}

async function create(req, res) {
  const { email, password } = req.body;
  try{
    const user = await User.create({
      email,
      password
    });
    send_success(res, user, {}, `created user: ${user.email} successfully`)
  }
  catch(error){
    send_error(res, error)
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email
  });

  if (!user) {
    res.status(401).json({
      message: "User not found"
    });
  }
  if (bcrypt.compareSync(password, user.password)) { // comparing hashed passwords
    try{
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });
      send_success(res, user, token)
    }
    catch(error){
      send_error(res, error)
    }
  } else {
    res.status(401).json({
      message: "Wrong credentials"
    });
  }
}

async function get(req, res) {
  const user = await User.findOne({
    _id: req.params.id
  });
  send_success(res, user)
}

module.exports = {
  create,
  login,
  get
}
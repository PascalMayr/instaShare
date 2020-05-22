const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

const send_success = function(res, user, token = {}){
  res.json({
    user,
    token,
    message: `created user: ${user.email} successfully`
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
    send_success(res, user)
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
    throw Error("User not found");
  }
  if (bcrypt.compareSync(password, user.password)) {
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
      message: "Unauthenticated"
    });
  }
}

async function getAll(req, res) {
  const user = await User.find({});
  send_success(res, user)
}

async function get(req, res) {
  console.log(req)
  const user = await User.findOne({
    _id: req.params.id
  });
  send_success(res, user)
}

module.exports = {
  create,
  login,
  get,
  getAll
}
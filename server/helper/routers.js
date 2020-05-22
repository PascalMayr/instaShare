const { withJWTAuthMiddleware } = require("express-kun");
const { Router } = require('express')
const router = Router();
require('dotenv').config();

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

module.exports = {
  router,  
  protectedRouter
}
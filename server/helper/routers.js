const { withJWTAuthMiddleware } = require("express-kun");
const { Router } = require('express')
const router = Router();
require('dotenv').config();

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);
// if no Authorization header is set on the request, the response will automatically be invalid token - unauthorized

module.exports = {
  router,  
  protectedRouter
}
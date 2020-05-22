const { Router } = require('express');
const userController = require('../controllers/users');
const { withJWTAuthMiddleware } = require("express-kun");
const router = Router();
require('dotenv').config();

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

router.post('/', userController.create);
// get all users only with jwt token
protectedRouter.get("/", userController.getAll);
router.post('/login', userController.login);
// get specific user only with jwt token
protectedRouter.get("/:id", userController.get);

module.exports = router;

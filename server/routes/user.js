const { router, protectedRouter } = require('../helper/routers');
const userController = require('../controllers/users');

router.post('/users/', userController.create); // signup
router.post('/users/login', userController.login); // login
// get specific user only with jwt token
protectedRouter.get('/user/:id', userController.get); // get user metadata

module.exports = router;

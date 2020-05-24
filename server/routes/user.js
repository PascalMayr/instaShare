const { router, protectedRouter } = require('../helper/routers');
const userController = require('../controllers/users');

router.post('/users/', userController.create);
router.post('/users/login', userController.login);
// get specific user only with jwt token
protectedRouter.get('/user/:id', userController.get);

module.exports = router;

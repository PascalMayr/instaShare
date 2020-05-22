const { router, protectedRouter } = require('../helper/routers');
const userController = require('../controllers/users');

router.post('/', userController.create);
// get all users only with jwt token
protectedRouter.get("/", userController.getAll);
router.post('/login', userController.login);
// get specific user only with jwt token
protectedRouter.get("/:id", userController.get);

module.exports = router;

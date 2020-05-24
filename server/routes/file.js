const { router, protectedRouter } = require('../helper/routers');
const fileController = require('../controllers/file');

protectedRouter.get("/all/:userId", fileController.get_all);
protectedRouter.post("/upload/:userId", fileController.uploadFile);

module.exports = router
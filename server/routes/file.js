const { router, protectedRouter } = require('../helper/routers');
const fileController = require('../controllers/file');

protectedRouter.get("/all/:userId", fileController.get_all);
protectedRouter.post("/upload/:userId", fileController.uploadFile);
protectedRouter.post("/update", fileController.update_metadata);

module.exports = router
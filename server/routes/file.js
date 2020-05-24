const { router, protectedRouter } = require('../helper/routers');
const fileController = require('../controllers/file');

protectedRouter.post("/upload/:userId", fileController.uploadFile);

module.exports = router
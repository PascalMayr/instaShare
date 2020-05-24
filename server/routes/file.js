const { router, protectedRouter } = require('../helper/routers');
const fileController = require('../controllers/file');

protectedRouter.get("/all/:userId", fileController.get_all);
protectedRouter.post("/upload/:userId", fileController.uploadFile);
protectedRouter.post("/update", fileController.update_metadata);
router.get("/download/:id", fileController.download); // everyone can download files
protectedRouter.get("/delete/:id", fileController.deleteFile);

module.exports = router
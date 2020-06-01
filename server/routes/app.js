const { router } = require('../helper/routers');
const appController = require('../controllers/app');

router.get("*", appController.build)

module.exports = router
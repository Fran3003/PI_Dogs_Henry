const {Router} = require('express');
const {getTempApi} = require('../controllers/temperamentControllers');

const router = Router();

router.get('/', getTempApi);

module.exports = router;
const { Router } = require('express');
const controller = require('../controllers/services.controller');

const router = Router();

router.get('/', controller.getServices);
router.get('/:sid', controller.getServiceById);
router.post('/', controller.createService);
router.put('/:sid', controller.updateService);
router.delete('/:sid', controller.deleteService);

module.exports = router;

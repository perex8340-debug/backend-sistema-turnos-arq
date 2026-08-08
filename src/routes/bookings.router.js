const { Router } = require('express');
const controller = require('../controllers/bookings.controller');

const router = Router();

router.post('/', controller.createBooking);
router.get('/:bid', controller.getBookingById);
router.post('/:bid/services/:sid', controller.addServiceToBooking);

module.exports = router;

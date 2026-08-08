const BookingManager = require('../managers/BookingManager');
const ServiceManager = require('../managers/ServiceManager');

const createBooking = (req, res) => {
  const { user, date, time } = req.body;
  if (!user || !date || !time) {
    return res.status(400).json({ error: 'user, date y time son obligatorios' });
  }
  const newBooking = BookingManager.createBooking({ user, date, time });
  res.status(201).json(newBooking);
};

const getBookingById = (req, res) => {
  const booking = BookingManager.getBookingById(req.params.bid);
  if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.status(200).json(booking);
};

const addServiceToBooking = (req, res) => {
  const { bid, sid } = req.params;

  const service = ServiceManager.getServiceById(sid);
  if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

  const booking = BookingManager.addServiceToBooking(bid, sid);
  if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });

  res.status(200).json(booking);
};

module.exports = {
  createBooking,
  getBookingById,
  addServiceToBooking,
};

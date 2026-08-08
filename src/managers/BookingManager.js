const fs = require('fs');
const path = require('path');

const bookingsPath = path.join(__dirname, '..', 'data', 'bookings.json');

const readBookings = () => JSON.parse(fs.readFileSync(bookingsPath, 'utf-8'));

const writeBookings = (bookings) =>
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

class BookingManager {
  createBooking(bookingData) {
    const bookings = readBookings();
    const nextId = bookings.reduce((max, booking) => Math.max(max, booking.id), 0) + 1;
    const newBooking = { id: nextId, services: [], ...bookingData };
    bookings.push(newBooking);
    writeBookings(bookings);
    return newBooking;
  }

  getBookingById(id) {
    const bookings = readBookings();
    return bookings.find((booking) => booking.id === Number(id)) || null;
  }

  addServiceToBooking(bookingId, serviceId) {
    const bookings = readBookings();
    const booking = bookings.find((item) => item.id === Number(bookingId));
    if (!booking) return null;

    const services = booking.services || [];
    const parsedServiceId = Number(serviceId);
    if (!services.includes(parsedServiceId)) {
      services.push(parsedServiceId);
    }
    writeBookings(bookings);
    return booking;
  }
}

module.exports = new BookingManager();

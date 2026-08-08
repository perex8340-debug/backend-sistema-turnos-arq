const ServiceManager = require('../managers/ServiceManager');

const getServices = (req, res) => {
  res.status(200).json(ServiceManager.getServices());
};

const getServiceById = (req, res) => {
  const service = ServiceManager.getServiceById(req.params.sid);
  if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
  res.status(200).json(service);
};

const createService = (req, res) => {
  const { name, price, duration } = req.body;
  if (!name || !price || !duration) {
    return res.status(400).json({ error: 'name, price y duration son obligatorios' });
  }
  const newService = ServiceManager.createService({ name, price, duration });
  res.status(201).json(newService);
};

const updateService = (req, res) => {
  const updatedService = ServiceManager.updateService(req.params.sid, req.body);
  if (!updatedService) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  res.status(200).json(updatedService);
};

const deleteService = (req, res) => {
  const deletedService = ServiceManager.deleteService(req.params.sid);
  if (!deletedService) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  res.status(200).json(deletedService);
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};

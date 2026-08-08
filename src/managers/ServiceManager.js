const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, '..', 'data', 'services.json');

const readServices = () => JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

const writeServices = (services) =>
  fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2));

class ServiceManager {
  getServices() {
    return readServices();
  }

  getServiceById(id) {
    const services = readServices();
    return services.find((service) => service.id === Number(id)) || null;
  }

  createService(serviceData) {
    const services = readServices();
    const nextId = services.reduce((max, service) => Math.max(max, service.id), 0) + 1;
    const newService = { id: nextId, ...serviceData };
    services.push(newService);
    writeServices(services);
    return newService;
  }

  updateService(id, serviceData) {
    const services = readServices();
    const index = services.findIndex((service) => service.id === Number(id));
    if (index === -1) return null;
    services[index] = { ...services[index], ...serviceData, id: Number(id) };
    writeServices(services);
    return services[index];
  }

  deleteService(id) {
    const services = readServices();
    const index = services.findIndex((service) => service.id === Number(id));
    if (index === -1) return null;
    const [deletedService] = services.splice(index, 1);
    writeServices(services);
    return deletedService;
  }
}

module.exports = new ServiceManager();

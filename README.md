# Backend Sistema de Turnos y Reservas

API de turnos y reservas construida con Node.js y Express, organizada en capas:
**routers → controllers → managers**.

## Estructura del proyecto

```
src/
  config/
    env.config.js          # Configuración del entorno (variables, puerto)
  controllers/
    services.controller.js # Manejan req/res y delegan en ServiceManager
    bookings.controller.js # Manejan req/res y delegan en BookingManager
  managers/
    ServiceManager.js      # Lógica de datos de services (archivo JSON)
    BookingManager.js      # Lógica de datos de bookings (archivo JSON)
  routes/
    services.router.js     # Define endpoints de /api/services
    bookings.router.js     # Define endpoints de /api/bookings
  data/
    services.json          # Datos de servicios
    bookings.json          # Datos de reservas
  app.js                   # Configura la aplicación Express
  server.js                # Levanta el servidor
```

## Instalación y ejecución

```bash
npm install
cp .env.example .env
npm run dev      # con nodemon
npm start        # sin nodemon
```

## Endpoints

### Services

| Método | Ruta                  | Descripción                                  |
|--------|-----------------------|----------------------------------------------|
| GET    | /api/services         | Lista todos los servicios                    |
| GET    | /api/services/:sid    | Obtiene un servicio por id                   |
| POST   | /api/services         | Crea un servicio                             |
| PUT    | /api/services/:sid    | Actualiza un servicio por id                 |
| DELETE | /api/services/:sid    | Elimina un servicio por id                   |

Ejemplo de body para `POST /api/services`:

```json
{
  "name": "Corte de cabello",
  "price": 1500,
  "duration": 45
}
```

### Bookings

| Método | Ruta                          | Descripción                                       |
|--------|-------------------------------|---------------------------------------------------|
| POST   | /api/bookings                 | Crea una reserva                                  |
| GET    | /api/bookings/:bid            | Obtiene una reserva por id                        |
| POST   | /api/bookings/:bid/services/:sid | Agrega un servicio a una reserva (valida que exista) |

Ejemplo de body para `POST /api/bookings`:

```json
{
  "user": "juan.perez@mail.com",
  "date": "2026-08-20",
  "time": "15:30"
}
```

## Arquitectura

- **Routers**: solo definen endpoints y los conectan con su controller.
- **Controllers**: leen `req.params`, `req.query` y `req.body`, llaman al manager
  y responden con `res.status().json()`.
- **Managers**: manejan la lógica de datos (lectura/escritura de los archivos
  JSON) y **no usan** `req` ni `res`.

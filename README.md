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

En PowerShell (en lugar de `cp`): `Copy-Item .env.example .env`

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

## Ejemplos de prueba (curl)

```bash
# Services
curl http://localhost:3000/api/services
curl http://localhost:3000/api/services/1
curl -X POST http://localhost:3000/api/services -H "Content-Type: application/json" -d '{"name":"Masaje","price":2500,"duration":50}'
curl -X PUT http://localhost:3000/api/services/1 -H "Content-Type: application/json" -d '{"price":1800}'
curl -X DELETE http://localhost:3000/api/services/3

# Bookings
curl -X POST http://localhost:3000/api/bookings -H "Content-Type: application/json" -d '{"user":"juan.perez@mail.com","date":"2026-08-25","time":"17:00"}'
curl http://localhost:3000/api/bookings/1
curl -X POST http://localhost:3000/api/bookings/1/services/2
```

## Arquitectura

- **Routers**: solo definen endpoints y los conectan con su controller.
- **Controllers**: leen `req.params`, `req.query` y `req.body`, llaman al manager
  y responden con `res.status().json()`.
- **Managers**: manejan la lógica de datos (lectura/escritura de los archivos
  JSON) y **no usan** `req` ni `res`.

# Users Admin API

API RESTful para administrar usuarios (CRUD) construida con Node.js + TypeScript y desplegada en Render.

Base URL (producción): https://users-admin-api.onrender.com/users

Esta API es un proyecto de práctica pensado para consumir desde aplicaciones front-end o integrarse como microservicio. Está preparada para producción básica en plataformas como Render o servicios similares.

## Características

- TypeScript (ESM)
- Express 5
- PostgreSQL via `pg` (Pool)
- Validación de entrada con `express-validator`
- Endpoints para crear, listar, buscar, actualizar y eliminar usuarios

## Estado del despliegue

- Aplicación desplegada en Render: `https://users-admin-api.onrender.com/users`
- Base de datos PostgreSQL desplegada en Render

## Requisitos (desarrollo)

- Node.js 18+ (recomendado)
- PostgreSQL (local o remoto)
- npm

## Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone git@github.com:EmersonTejada/users-admin-api.git
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz con las variables necesarias (ejemplo más abajo).

4. Ejecuta en modo desarrollo:

```bash
npm run dev
```

5. Para producción compila y arranca:

```bash
npm run build
npm start
```

## Esquema de la tabla `users` (ejemplo SQL)

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Variables de entorno

Archivo `.env` de ejemplo (local):

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=my_users_db
DB_PORT=5432
```

En Render las variables se configuran desde el panel de la aplicación; asegúrate de añadir las mismas variables con los valores de la base de datos gestionada.

## Scripts (package.json)

- `npm run dev` – iniciar en modo desarrollo (nodemon)
- `npm run build` – compilar TypeScript a `./dist`
- `npm start` – ejecutar la versión compilada

## Endpoints (producción / consumo)

Base URL (producción): `https://users-admin-api.onrender.com/users`

Todos los ejemplos a continuación usan la URL de producción. Ajusta a `http://localhost:PORT/users` si pruebas localmente.

- GET `/` — Listar todos los usuarios

```bash
curl https://users-admin-api.onrender.com/users/
```

- POST `/create` — Crear un usuario

Request body (JSON):

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

Ejemplo:

```bash
curl -X POST https://users-admin-api.onrender.com/users/create \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}'
```

- GET `/search?searchQuery=texto` — Buscar por nombre, apellido o email

```bash
curl "https://users-admin-api.onrender.com/users/search?searchQuery=john"
```

- GET `/:id/update` — Obtener usuario por id

```bash
curl https://users-admin-api.onrender.com/users/1/update
```

- POST `/:id/update` — Actualizar usuario

```bash
curl -X POST https://users-admin-api.onrender.com/users/1/update \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com"}'
```

- POST `/:id/delete` — Eliminar usuario por id

```bash
curl -X POST https://users-admin-api.onrender.com/users/1/delete
```

- GET `/delete` — Eliminar todos los usuarios (TRUNCATE)

```bash
curl https://users-admin-api.onrender.com/users/delete
```







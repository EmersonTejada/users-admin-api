# Users Admin API

Este repositorio contiene una pequeña API en Node.js + TypeScript para administrar usuarios. Permite crear, listar, buscar, actualizar y eliminar usuarios. Está pensado para desplegarse en plataformas como Heroku, Render o un servidor propio usando variables de entorno para la conexión a la base de datos.

## Características

- TypeScript con ESM
- Express 5
- Conexión a PostgreSQL usando `pg`
- Validación con `express-validator`
- Rutas para CRUD y búsqueda

## Requisitos

- Node.js 18+ (recomendado)
- PostgreSQL
- npm

## Instalación

1. Clonar el repo:

```bash
git clone git@github.com:EmersonTejada/users-admin-api.git

```

2. Instalar dependencias:

```bash
npm install
```

1. Crear un archivo `.env` en la raíz del directorio con las variables de entorno necesarias (ver más abajo).

2. Crear la base de datos PostgreSQL y la tabla `users` (ejemplo de SQL):

```sql
-- Crear tabla users
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  email VARCHAR (100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
```


## Variables de entorno

Crear `.env` con al menos estas variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=my_users_db
DB_PORT=5432
```

## Scripts útiles (package.json)

- `npm run dev` — arranca la app en modo desarrollo con `nodemon`.
- `npm run build` — compila TypeScript a `./dist`.
- `npm start` — ejecuta la app compilada desde `./dist`.

## Endpoints

Base URL: `http://localhost:3000/users` (ajusta `PORT` si lo cambias)

- GET `/` — Lista todos los usuarios.

  Ejemplo:

  ```bash
  curl http://localhost:3000/users/
  ```

- POST `/create` — Crea un usuario.

  Body (JSON):

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
  ```

  Ejemplo:

  ```bash
  curl -X POST http://localhost:3000/users/create -H "Content-Type: application/json" -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}'
  ```

- GET `/search?searchQuery=texto` — Busca usuarios por nombre, apellido o email (ILIKE).

  Ejemplo:

  ```bash
  curl "http://localhost:3000/users/search?searchQuery=john"
  ```

- GET `/:id/update` — Obtiene el usuario por id.

  Ejemplo:

  ```bash
  curl http://localhost:3000/users/1/update
  ```

- POST `/:id/update` — Actualiza un usuario.

  Body (JSON) — los mismos campos que en `create`.

  Ejemplo:

  ```bash
  curl -X POST http://localhost:3000/users/1/update -H "Content-Type: application/json" -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com"}'
  ```

- POST `/:id/delete` — Elimina un usuario por id.

  Ejemplo:

  ```bash
  curl -X POST http://localhost:3000/users/1/delete
  ```

- GET `/delete` — Elimina todos los usuarios (TRUNCATE).

  Ejemplo:

  ```bash
  curl http://localhost:3000/users/delete
  ```

## Notas de implementación

- El proyecto usa TypeScript en modo ESM. Los archivos fuente están en `src/` y la compilación va a `dist/`.
- La persistencia se realiza con PostgreSQL a través de `src/models/userModel.ts` que utiliza `pg` y una `Pool` configurada en `src/db/index.ts`.

## Pruebas rápidas

1. Levanta la DB local y la app en modo desarrollo:

```bash
npm run dev
```

2. Prueba los endpoints con curl o Postman.



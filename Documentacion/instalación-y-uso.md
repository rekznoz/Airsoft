
# 📘 **Descripción del Proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 📋 [Requisitos](requisitos)
* 🚀 [Instalación](instalación)

---

## 📋 **Requisitos**

Aquí tienes un archivo `README.md` con los **requisitos necesarios para ejecutar una aplicación web con React como frontend y una API en Laravel 10 como backend**:

# Requisitos para Ejecutar una Web con React + API Laravel 10

Este proyecto consiste en una aplicación frontend desarrollada en **React** que se comunica con una **API RESTful en Laravel 10**. Para ejecutarla correctamente en local o en producción, asegúrate de cumplir con los siguientes requisitos.

---

## 🔧 Requisitos Generales

- **Git** instalado para clonar el repositorio.
- **Node.js** (v18.x o superior recomendado)
- **npm** o **yarn**
- **PHP** >= 8.1
- **Composer**
- **Base de datos** (MySQL/MariaDB o PostgreSQL)
- **Servidor local** como Laravel Sail, XAMPP, Laravel Valet o Docker (opcional pero recomendado)

---

## 📦 Backend: Laravel 10

### Requisitos del Sistema

- PHP >= 8.1
- Composer
- Extensiones de PHP necesarias:
  - `bcmath`
  - `ctype`
  - `fileinfo`
  - `json`
  - `mbstring`
  - `openssl`
  - `pdo`
  - `tokenizer`
  - `xml`

### Instalación

1. Clonar el repositorio y acceder al directorio del servidor:
   
   ```bash
   git clone https://github.com/rekznoz/Airsoft
   cd Servidor
   ````

2. Instalar dependencias:

   ```bash
   composer install
   ```

3. Configurar archivo `.env`:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Configurar conexión a la base de datos en `.env`.

5. Ejecutar migraciones (y seeders si es necesario):

   ```bash
   php artisan migrate --seed
   ```

6. Iniciar servidor:

   ```bash
   php artisan serve
   ```

---

## 🖥️ Frontend: React

### Requisitos del Sistema

* Node.js >= 18.x
* npm o yarn

### Instalación

1. Acceder al directorio del cliente:

   ```bash
   cd Cliente
   ```

2. Instalar dependencias:

   ```bash
   npm install
   # o
   yarn
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` y añade la URL de la API:

   ```
    VITE_API_PRODUCTOS_URL  = "http://127.0.0.1:8000/api/productos"
    VITE_API_CATEGORIAS_URL = "http://127.0.0.1:8000/api/categorias"
    VITE_API_PEDIDOS_URL    = "http://127.0.0.1:8000/api/pedidos"
    VITE_API_COMENTARIOS_URL= "http://127.0.0.1:8000/api/comentarios"
    
    VITE_API_URL_USERS      = "http://127.0.0.1:8000/api/auth/users"
    VITE_API_URL_AUTH       = "http://127.0.0.1:8000/api/auth/login"
    VITE_API_URL_REGISTER   = "http://127.0.0.1:8000/api/auth/register"
    VITE_API_URL_LOGOUT     = "http://127.0.0.1:8000/api/auth/logout"
    VITE_API_URL_REFRESH    = "http://127.0.0.1:8000/api/auth/refresh"
   ```

4. Iniciar servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

---

## 🔐 Autenticación

Este proyecto utiliza **JWT (JSON Web Tokens)** para la autenticación. Asegúrate de que:

* Laravel tenga instalado el paquete `tymon/jwt-auth`.
* El middleware `auth:api` esté correctamente configurado en las rutas.
* El frontend gestione el token en `localStorage` o `sessionStorage`.

---

## ✅ Verificación

* Accede a `http://localhost:5173` para el frontend (React).
* Accede a `http://localhost:8000/api` para el backend (Laravel API).

Ambos deben funcionar y conectarse correctamente.

---

## 🛠️ Troubleshooting

* Asegúrate de que **CORS** esté habilitado en Laravel (`laravel-cors` o configuración manual).
* Verifica que la URL de la API en el `.env` del frontend coincida con el backend.
* Si usas Docker o Sail, asegúrate de exponer los puertos correctamente.

---

## 📂 Estructura de Carpetas

```
/Servidor  ← API Laravel
/Cliente   ← Frontend React
```

---
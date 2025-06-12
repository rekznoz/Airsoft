
# 🧰 **Instalación y Requisitos**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 📋 [Requisitos](#📋-requisitos)
* 🚀 [Instalación](#🚀-instalación)
* 🔐 [Autenticación](#🔐-autenticación)
* ✅ [Verificación](#✅-verificación)
* 🛠️ [Solución de problemas](#🛠️-solución-de-problemas)
* 📂 [Estructura del proyecto](#📂-estructura-del-proyecto)

---

## 📋 **Requisitos**

Este proyecto es una aplicación web desarrollada con **React** en el frontend y una **API RESTful en Laravel 10** como backend. A continuación, los requisitos para ejecutarla localmente:

### 🔧 Requisitos generales

* 📌 Git
* 📌 Node.js (v18.x o superior)
* 📌 npm o yarn
* 📌 PHP >= 8.1
* 📌 Composer
* 📌 MySQL/MariaDB o PostgreSQL
* 📌 Servidor local: Laravel Sail, XAMPP, Docker, Laragon, etc.

---

## 🚀 **Instalación**

### 🔙 Backend – Laravel 10

1. 📥 Clonar repositorio y acceder al directorio del servidor:

   ```bash
   git clone https://github.com/rekznoz/Airsoft
   cd Servidor
   ```

2. 📦 Instalar dependencias:

   ```bash
   composer install
   ```

3. ⚙️ Configurar entorno:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. 🛠️ Configurar conexión en `.env` a la base de datos.

    ```env
    DB_CONNECTION=mysql
    DB_HOST=
    DB_PORT=3306
    DB_DATABASE=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    ```

5. 🧬 Ejecutar migraciones (y seeders si procede):

   ```bash
   php artisan migrate --seed
   ```

6. 🚀 Iniciar el servidor:

   ```bash
   php artisan serve
   ```

---

### 🖥️ Frontend – React

1. 📂 Acceder al directorio del cliente:

   ```bash
   cd Cliente
   ```

2. 📦 Instalar dependencias:

   ```bash
   npm install
   # o
   yarn
   ```

3. ⚙️ Crear archivo `.env` con las rutas de la API:

   ```env
   VITE_API_PRODUCTOS_URL   = "http://127.0.0.1:8000/api/productos"
   VITE_API_CATEGORIAS_URL  = "http://127.0.0.1:8000/api/categorias"
   VITE_API_PEDIDOS_URL     = "http://127.0.0.1:8000/api/pedidos"
   VITE_API_COMENTARIOS_URL = "http://127.0.0.1:8000/api/comentarios"

   VITE_API_URL_USERS       = "http://127.0.0.1:8000/api/auth/users"
   VITE_API_URL_AUTH        = "http://127.0.0.1:8000/api/auth/login"
   VITE_API_URL_REGISTER    = "http://127.0.0.1:8000/api/auth/register"
   VITE_API_URL_LOGOUT      = "http://127.0.0.1:8000/api/auth/logout"
   VITE_API_URL_REFRESH     = "http://127.0.0.1:8000/api/auth/refresh"
   ```

4. 🧪 Iniciar servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

---

## 🔐 **Autenticación (JWT)**

Este proyecto implementa autenticación con **JWT (JSON Web Tokens)**:

* Laravel debe tener instalado el paquete `tymon/jwt-auth`.
* Las rutas protegidas deben usar el middleware `auth:api`.
* El frontend debe almacenar el token en `localStorage` o `sessionStorage` y enviarlo en las peticiones.

---

## ✅ **Verificación**

* 🌐 Frontend: [http://localhost:5173](http://localhost:5173)
* 🌐 Backend (API): [http://localhost:8000/api](http://localhost:8000/api)

Ambas partes deben estar conectadas y funcionando correctamente.

---

## 🛠️ **Solución de problemas**

* 🚫 **CORS:** Verifica la configuración de CORS en Laravel (`barryvdh/laravel-cors` o manualmente).
* 🔁 **URLs:** Asegúrate de que las rutas del frontend coincidan con la URL real del backend.
* 🐳 **Docker/Sail:** Si los usas, asegúrate de exponer los puertos necesarios.

---

## 📂 **Estructura del Proyecto**

```
Airsoft-Web/
├── Servidor/   ← API Laravel 10
└── Cliente/    ← Frontend React
```

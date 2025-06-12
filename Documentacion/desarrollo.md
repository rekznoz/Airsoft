
# 🧱 **Desarrollo del Proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 🏗️ [Estructura del proyecto](#🏗️-estructura-del-proyecto)
* 💻 [Tecnologías utilizadas](#💻-tecnologías-utilizadas)
* 🛠️ [Desarrollo del proyecto](#🛠️-desarrollo-del-proyecto)

---

## 🏗️ **Estructura del Proyecto**

La siguiente es la estructura del proyecto `Airsoft`, organizada en tres bloques principales:

```plaintext
Airsoft/
│ 
├── README.md
│ 
├── Cliente/                  ← Aplicación web React
│   │ 
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── netlify.toml
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       │ 
│       ├── main.jsx
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── context/
│       ├── css/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── router/
│       └── services/
│ 
├── Documentacion/            ← Documentación técnica y visual
│   │ 
│   ├── config.yaml
│   ├── *.md
│   └── ClienteWeb/
│       │ 
│       ├── *.html
│       ├── fonts/
│       ├── scripts/
│       └── styles/
│ 
└── Servidor/                 ← API RESTful Laravel 10
    │ 
    ├── artisan
    ├── composer.json
    ├── .env.example
    ├── app/
    │   │ 
    │   ├── Console/
    │   ├── Exceptions/
    │   ├── Http/
    │   ├── Models/
    │   ├── Observers/
    │   └── Providers/
    ├── database/
    │   │ 
    │   ├── factories/
    │   ├── migrations/
    │   └── seeders/
    │ 
    ├── routes/
    └── tests/
```

> 🧩 **Resumen**:
>
> * `Cliente/`: Código del frontend con React + Vite.
> * `Servidor/`: Backend Laravel 10, autenticación, modelos y API REST.
> * `Documentacion/`: Archivos de apoyo, vistas previas y JSDoc generado.

---

## 💻 **Tecnologías Utilizadas**

### 🔹 **Frontend**

* **React 19** – UI principal
* **Vite** – Bundler de alto rendimiento
* **React Router DOM** – Navegación dinámica
* **Zustand** – Gestión global de estado
* **Formik + Yup** – Formularios y validación
* **SweetAlert2** – Diálogos personalizables

### 🔹 **Backend**

* **Laravel 10 (PHP)** – Framework del servidor
* **JWT (tymon/jwt-auth)** – Autenticación
* **Sanctum** (opcional/configurable)
* **Eloquent ORM** – Abstracción de base de datos

### 🔹 **Base de Datos**

* **MySQL**

### 🔹 **Despliegue y documentación**

* **Netlify** – Hosting del frontend
* **Figma** – Diseño de interfaz y prototipado
* **JSDoc + Docdash** – Generación de documentación visual

---

## 🛠️ **Desarrollo del Proyecto**

El desarrollo de *La Web de Airsoft* nació con la intención de profesionalizar un modelo de venta previa realizado por Telegram, buscando brindar una experiencia más sólida, moderna y accesible.

Desde un principio se planteó una arquitectura desacoplada, con **React** en el frontend y **Laravel 10** como backend, comunicándose mediante una **API RESTful**. Esta separación permitió un desarrollo modular, escalable y fácilmente mantenible.

### 🧪 Fases clave del desarrollo:

1. **Diseño y prototipado:**
   Se utilizó **Figma** para definir la estructura de navegación, la jerarquía visual y los estilos. Se priorizó una UX intuitiva para usuarios nuevos y recurrentes.

2. **Implementación del cliente (React):**

    * Página de inicio, catálogo, login/register y perfil.
    * Gestión de productos, comentarios, formularios protegidos y rutas privadas.
    * Integración con JWT y consumo de la API.

3. **Construcción del backend (Laravel):**

    * API RESTful completa para productos, usuarios, pedidos y comentarios.
    * Middleware de autenticación JWT.
    * Migraciones, seeders y controladores estructurados.

4. **Panel de administración:**

    * Herramientas CRUD para productos y pedidos.
    * Validación robusta de formularios con feedback visual.

5. **Documentación y despliegue:**

    * Generación de documentación técnica.
    * Despliegue del cliente en **Netlify**, con vistas a futuro para un backend autoescalable en servidor VPS o Docker.

---

### 🎯 Objetivos del proyecto

Este sitio no busca competir con marketplaces masivos, sino convertirse en una solución **auténtica, accesible y cercana** para la comunidad airsofter. Fue desarrollado por y para jugadores, poniendo énfasis en la confianza, la funcionalidad clara y la facilidad de uso.

---

¿Quieres ahora que te prepare una presentación en PowerPoint/Markdown para exponer este desarrollo? También puedo ayudarte a exportar esto como documento PDF o plantilla para Notion si lo necesitas.


# **Desarrollo del Proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 🏗️ [Estructura del proyecto](estructura-del-proyecto)
* 💻 [Tecnologías utilizadas](tecnologías-utilizadas)
* 🧩 [Desarrollo del proyecto](desarrollo-del-proyecto)

---

## 🏗️ **Estructura del proyecto**

´´´´´´Claro, aquí tienes la estructura del proyecto `rekznoz-airsoft` en formato Markdown:

# 📁 Estructura del Proyecto: rekznoz-airsoft

```plaintext
rekznoz-airsoft/
├── README.md
├── Cliente/
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── netlify.toml
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   ├── .gitignore
│   ├── public/
│   └── src/
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
├── Documentacion/
│   ├── *config.yaml
│   ├── bibliografía.md
│   ├── desarrollo.md
│   ├── descripción-del-proyecto.md
│   ├── despliegue.md
│   ├── instalación-y-uso.md
│   ├── introducción.md
│   ├── manual-de-uso.md
│   └── ClienteWeb/
│       ├── components**.html
│       ├── context\_*.html
│       ├── fonts/
│       ├── scripts/
│       └── styles/
└── Servidor/
├── README.md
├── artisan
├── composer.json
├── package.json
├── phpunit.xml
├── vite.config.js
├── .env.example
├── app/
│   ├── Console/
│   ├── Exceptions/
│   ├── Http/
│   ├── Models/
│   ├── Observers/
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
├── routes/
└── tests/

```

```

> Esta estructura contiene tres grandes bloques:
> - `Cliente/`: Aplicación web en React con Vite.
> - `Servidor/`: Backend en Laravel con controladores, modelos y rutas API.
> - `Documentacion/`: Archivos Markdown, documentación técnica y JSDoc generado.

¿Deseas que lo convierta también en un diagrama visual o lo exporte a PDF/Word?
```


## 💻 **Tecnologías utilizadas**

---

### 🧩 **Tecnologías utilizadas**

#### 🔹 Frontend

* **HTML, CSS, JavaScript**
* **React** (v19) – Biblioteca principal para construir la interfaz de usuario
* **Vite** – Herramienta de desarrollo y bundler
* **React Router DOM** – Enrutamiento dinámico en el cliente
* **Zustand** – Gestión de estado global
* **Formik + Yup** – Manejo y validación de formularios
* **SweetAlert2** – Alertas y diálogos personalizados

#### 🔹 Backend

* **Laravel** (PHP) – Framework principal del servidor backend
* **JWT (JSON Web Tokens)** – Autenticación
* **Sanctum** – Alternativa de autenticación en Laravel
* **Eloquent ORM** – Manejo de base de datos

#### 🔹 Base de Datos

* **MySQL** (asumido por uso típico en Laravel, aunque no se indica explícitamente)

#### 🔹 Herramientas de desarrollo y control de calidad

* **ESLint + eslint-plugin-react-hooks** – Linter para mantener calidad del código
* **Docdash** – Generación de documentación estilo JSDoc

#### 🔹 Despliegue

* **Netlify** – Hosting del frontend
* **Figma** – Diseño de interfaz de usuario (enlace incluido en el README)

---

### 🛠️ Desarrollo del Proyecto

El desarrollo de la plataforma web *La Web de Airsoft* surgió como una evolución natural de una experiencia previa de ventas a través de Telegram, con el objetivo de profesionalizar dicha actividad. Desde el inicio, el propósito fue crear un sitio confiable, intuitivo y responsivo, capaz de ofrecer una experiencia de compra atractiva y cercana para los aficionados al airsoft.

La arquitectura del sistema se basó en una separación clara entre frontend y backend. El frontend fue desarrollado en **React**, lo que permitió construir una interfaz dinámica, moderna y adaptativa para diversos dispositivos. Por su parte, el backend se construyó con **Laravel 10**, ofreciendo una API RESTful robusta y segura que maneja productos, usuarios, pedidos, comentarios y autenticación mediante tokens JWT.

Durante la etapa de planificación, se diseñó la estructura del sitio en Figma, asegurando una navegación clara y una jerarquía visual amigable. Posteriormente, se implementaron funcionalidades clave como:

* Catálogo de productos con fichas técnicas detalladas.
* Gestión de usuarios y perfiles.
* Sistema de comentarios y valoraciones.
* Panel de administración para control de inventario y pedidos.
* Integración de seguridad con login y protección de rutas mediante autenticación.

El despliegue se realizó a través de **Netlify** para el cliente y un servidor local para el backend, con opciones de escalabilidad futura. Se priorizó la accesibilidad, la velocidad de carga y la compatibilidad con navegadores modernos. El código fue documentado y modularizado para facilitar su mantenimiento y posibles ampliaciones a futuro.

Este proyecto no busca competir con grandes comercios electrónicos, sino posicionarse como una alternativa personal, honesta y construida por un jugador de airsoft para la comunidad de jugadores, destacando por su cercanía y enfoque en la confianza del usuario.

---
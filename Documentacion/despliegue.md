
# 🧱 **Despliegue del Proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 🏠 [Cliente Web: Hosting y dominio](#cliente-web)
* 🖥️ [Servidor API: Hosting y acceso](#servidor-api)

---

## 🧑‍💻 **Cliente Web**

### 🏠 **Hosting en Netlify**

El frontend del proyecto está desplegado en **[Netlify](https://www.netlify.com/)**, una plataforma que facilita el despliegue continuo de aplicaciones web estáticas con integración a Git y entrega a través de CDN.

#### ⚙️ **Pasos de configuración**

1. **Crear una cuenta en Netlify** y vincular tu repositorio de GitHub/GitLab/Bitbucket.
2. **Seleccionar el proyecto** y configurar los siguientes parámetros:

    * 📦 **Comando de construcción**: `npm run build`
    * 📂 **Directorio de publicación**: `Cliente/dist`
    * 🔐 **Variables de entorno**: API\_URL, claves privadas u otros valores sensibles.
3. **Archivo `netlify.toml`** (opcional) para configurar rutas, redirecciones y comportamiento personalizado:

   ```toml
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```
4. **Despliegue automático** con cada `push` a la rama principal.
5. **Verificación del despliegue** mediante una URL temporal proporcionada por Netlify.
6. **Optimización de rendimiento**:

    * CDN global
    * Minificación automática
    * Compresión de imágenes
7. **Certificados SSL gratuitos** mediante Let's Encrypt, activados por defecto.
8. **Logs de despliegue** accesibles desde el panel de Netlify para depuración.

### 🌍 **Dominio**

El sitio está disponible mediante la URL proporcionada por Netlify:

🔗 [rekzsoft.netlify.app](https://rekzsoft.netlify.app)

---

## 🖥️ **Servidor API**

### 🏠 **Hosting en servidor dedicado (Windows Server 2022)**

El backend de Laravel está alojado en un **servidor dedicado con Windows Server 2022**, utilizando **XAMPP** como entorno local de desarrollo (Apache + MySQL + PHP).

#### ⚙️ **Configuración del entorno**

1. **Instalación de XAMPP**:

    * Incluye Apache, PHP 8.x y MySQL.
    * Se inicia como servicio en el sistema operativo.

2. **Instalación de Composer**:

    * Requisito esencial para instalar dependencias de Laravel.
    * Comando de prueba: `composer -V`.

3. **Configuración del proyecto Laravel**:

    * `php artisan migrate --seed` para inicializar la base de datos.
    * Archivo `.env` configurado con IP local y datos de conexión.

4. **Base de datos MySQL**:

    * Corriendo en el mismo servidor XAMPP.
    * Gestión posible vía phpMyAdmin o cliente MySQL CLI.

5. **Opcional - Configurar NGINX**:

    * Para sustituir Apache o servir como proxy inverso si se quiere mejorar el rendimiento.

### 🌐 **Acceso al backend**

Actualmente, la API se expone mediante la **IP del servidor y su puerto**, sin un dominio personalizado. Por ejemplo:

```plaintext
http://192.168.1.100:8000/api
```

> 🔐 Se recomienda proteger el servidor con reglas de firewall, SSL, autenticación JWT y restricciones de CORS apropiadas.

---

### ✅ **Resumen del despliegue**

| Componente | Plataforma             | Dirección                                            |
| ---------- | ---------------------- | ---------------------------------------------------- |
| Frontend   | Netlify                | [rekzsoft.netlify.app](https://rekzsoft.netlify.app) |
| Backend    | Windows Server + XAMPP | `http://[IP-del-servidor]:[puerto]/api`              |


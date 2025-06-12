# 🧱 **Despliegue del proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 🏠 [Hosting](hosting)
* 🌍 [Dominio](dominio)

---

## 🏗️ **Cliente Web**

### 🏠 **Hosting**

El proyecto está desplegado en **Netlify**, una plataforma que permite alojar aplicaciones web estáticas de forma sencilla y eficiente. Netlify ofrece integración continua, despliegue automático desde repositorios Git y un CDN global para una carga rápida de los recursos.

#### 🌐 **Configuración en Netlify**

1. **Crear cuenta en Netlify**: Regístrate en [Netlify](https://www.netlify.com/) si aún no tienes una cuenta.
2. **Conectar repositorio**: Vincula tu cuenta de GitHub, GitLab o Bitbucket para que Netlify pueda acceder a tu proyecto.
3. **Configurar el despliegue**: Selecciona el repositorio del proyecto y configura los comandos de construcción y la carpeta de publicación. Para este proyecto, los ajustes son:
   - **Comando de construcción**: `npm run build`
   - **Directorio de publicación**: `Cliente/dist`
   - **Variables de entorno**: Configura las variables necesarias, como las claves de API o configuraciones específicas del entorno.
   - **Rutas de redirección**: Si es necesario, configura las rutas de redirección en el archivo `netlify.toml` para manejar las rutas del frontend.
   - **Despliegue automático**: Cada vez que se realice un push al repositorio, Netlify desplegará automáticamente la última versión del proyecto.
   - **Verificación del despliegue**: Una vez configurado, Netlify proporcionará una URL temporal para acceder a tu sitio. Puedes verificar que todo funcione correctamente antes de configurar un dominio personalizado.
   - **Monitoreo y logs**: Utiliza las herramientas de Netlify para monitorear el estado del despliegue, revisar logs y solucionar posibles problemas.
   - **CDN y optimización**: Netlify utiliza un CDN para distribuir el contenido de tu sitio, lo que mejora la velocidad de carga y la experiencia del usuario. Asegúrate de aprovechar las optimizaciones automáticas que ofrece la plataforma, como la compresión de imágenes y la minificación de archivos CSS y JavaScript.
   - **Seguridad y SSL**: Netlify proporciona certificados SSL gratuitos para tus dominios, asegurando que tu sitio sea accesible de forma segura a través de HTTPS. Configura el SSL en la sección de dominios de Netlify.
   - **Redirecciones y reescrituras**: Si tu aplicación utiliza rutas específicas, asegúrate de configurar las redirecciones y reescrituras necesarias en el archivo `netlify.toml` para que funcionen correctamente en el entorno de producción.

#### 🌍 **Dominio**

Para el dominio del proyecto, se ha utilizado **rekzsoft.netlify.app**, que es proporcionado por Netlify de forma gratuita.

### 🌐 **Servidor API**

### 🏠 **Hosting**

La API del Proyecto esta desplegada en un Servidor dedicado con Windows Server 2022, utilizando **XAMPP** como servidor web. Esta configuración permite manejar las peticiones del frontend y gestionar la base de datos de manera eficiente.

#### 🌐 **Configuración del Servidor**

1. **Instalar NGINX**: Asegúrate de que NGINX esté instalado y configurado correctamente en tu servidor. Puedes seguir la [documentación oficial de NGINX](https://nginx.org/en/docs/) para la instalación y configuración básica.
2. **Instalar PHP**: Asegúrate de que PHP esté instalado y configurado en tu servidor. Puedes verificar la versión de PHP ejecutando `php -v` en la terminal.
3. **Instalar MySQL**: Asegúrate de que MySQL esté instalado y configurado correctamente. Puedes verificar la conexión a la base de datos utilizando el cliente de MySQL.
4. **Instalar Composer**: Asegúrate de que Composer esté instalado en tu servidor para gestionar las dependencias de Laravel. Puedes verificar la instalación ejecutando `composer -V`.

#### 🌍 **Dominio**

Para el dominio del servidor, no utilizo ningun dominio si no la direccion IP del servidor con su puerto correspondiente.
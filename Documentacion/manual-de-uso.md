
# 🧱 **Manual de Uso del Proyecto**

[🔙 Volver al índice principal](../README.md)

---

## 📑 **Contenido de esta sección**

### 🧭 Índice

* 👤 [Guía de Usuario](#guía-de-usuario)
* 🛡️ [Guía de Administrador](#guía-de-administrador)

---

## 👤 **Guía de Usuario**

Esta guía te ayudará a utilizar eficientemente **Rekznoz Airsoft**, una tienda en línea especializada en artículos de airsoft.

---

### 1. Registro e Inicio de Sesión

#### 🔐 Crear una cuenta

1. Ve a la página principal.
2. Haz clic en **"Login"** en el menú superior.
3. Pulsa en **"¿No tienes cuenta? Regístrate aquí"**.
4. Rellena el formulario con tu nombre, correo electrónico y contraseña.
5. Haz clic en **"Registrarse"**.

https://github.com/user-attachments/assets/c1c3ac0c-742e-47bc-9043-317186a94590

#### 🔑 Iniciar sesión

1. Entra en **Login** desde el menú.
2. Ingresa tus credenciales y pulsa **"Entrar"**.
3. Serás redirigido a tu perfil o a la página principal.

https://github.com/user-attachments/assets/2c46813d-fc3e-45f7-9b75-bb00b403e6ce

---

### 2. Navegación por la Tienda

#### 🛒 Explorar productos

* Haz clic en el menú **"Tienda"**.
* Explora los productos con imágenes, descripción y precio.
* Filtra por categorías o usa la búsqueda para encontrar lo que necesitas.

https://github.com/user-attachments/assets/4ef1d74f-8b94-41ed-bb72-d1e56ff4c37f

---

### 3. Carrito de Compras

#### ➕ Añadir productos

* Desde la página de producto, haz clic en **"Añadir al carrito"**.
* Puedes ajustar la cantidad antes de añadirlo.

#### 🧺 Gestionar carrito

* Haz clic en el icono del carrito (parte superior derecha).
* Desde el **mini carrito** puedes:

    * Cambiar cantidad.
    * Eliminar productos.
    * Vaciar el carrito.
    * Ver el total y acceder al carrito completo para finalizar la compra.
 
https://github.com/user-attachments/assets/7c0ca15a-8f67-4f4c-8868-dd22f3686a25

---

### 4. Realizar un Pedido

#### 💳 Comprar paso a paso

1. Haz clic en **"Ver carrito"**, luego en **"Comprar"**.
2. Completa tu información de envío.
3. Confirma el pedido.
4. Recibirás una notificación y podrás seguir el estado desde tu perfil.

https://github.com/user-attachments/assets/c7c66f4e-6ecb-4490-a710-20b753b12252

---

### 5. Perfil del Usuario

#### 👤 Opciones disponibles

* Desde el menú accede a **"Perfil"**, donde podrás:

    * Ver tus datos personales.
    * Consultar tu historial de pedidos.
    * Acceder al detalle de cada pedido.

---

### 6. Comentarios y Valoraciones

#### 📝 Opiniones de productos

* En la vista de producto:

    * Puedes leer comentarios y puntuaciones de otros usuarios.
    * Si estás logueado, puedes dejar tu comentario y valorar con estrellas.
    * Puedes editar o eliminar tus propios comentarios.
 
https://github.com/user-attachments/assets/27966435-c19f-4b5a-9fb1-5b9355feaa44

---

### 7. Interfaz Responsiva y Modos Visuales

#### 🌗 Modo visual

* Usa el botón del encabezado para alternar entre:

    * Modo claro / oscuro / bosque / nieve.
* El cambio se aplica instantáneamente.

#### 📱 Uso en dispositivos móviles

* Pulsa el icono ☰ para abrir el menú.
* El mini carrito también es accesible desde el móvil.

---

### 8. Notificaciones

#### 🔔 Alertas

* Si eres **administrador**, verás un icono “!” en **"Gestor"** si hay pedidos pendientes.
* Como usuario, serás notificado cuando tu pedido cambie de estado.

---

### 9. Cerrar Sesión

#### 🚪 Salir

* Haz clic en **"Logout"**.
* Se cerrará tu sesión y volverás a la página de inicio.

---

## 🛡️ **Guía de Administrador**

Esta sección está destinada a usuarios con rol **administrador**, responsables de la gestión de productos, categorías, comentarios y pedidos.

---

### 1. Acceso al Panel de Administración

#### 🔑 Ingreso

1. Inicia sesión como administrador.
2. En el menú verás la opción **"Gestor"**.
3. Si hay pedidos pendientes, aparecerá un icono de alerta (**!**).

---

### 2. Panel de Gestión

Accede a `/gestor` para gestionar el contenido. Las secciones disponibles son:

#### 📦 Productos

* Ver lista paginada.
* Crear producto mediante formulario modal.
* Editar/eliminar productos.
* Asignar categorías.
* Subir o reemplazar imágenes.

#### 🧩 Categorías

* Crear nuevas categorías.
* Editar o eliminar existentes.
* ⚠️ *Evita eliminar categorías en uso*.

#### 💬 Comentarios

* Ver todos los comentarios.
* Eliminar comentarios inadecuados.
* No se permite editarlos.

#### 📑 Pedidos

* Revisar pedidos con su estado, productos y datos del cliente.
* Cambiar el estado de un pedido:

```plaintext
"pendiente" → "procesando" → "enviado" → "completado"/"cancelado"
```

https://github.com/user-attachments/assets/c6fe52a6-56e4-4191-81b0-83b5b19cb07f

---

### 3. Interfaz de Gestión

#### 📄 Paginación

* Disponible en listas largas (productos, pedidos, etc.).

#### 🧊 Modal de producto

* Crear/editar productos en una ventana modal con validaciones integradas.

#### ⚠️ Confirmaciones

* Las acciones destructivas requieren confirmación con **SweetAlert2**.

---

### 4. Seguridad y Acceso

#### 🔐 Roles

* Solo usuarios con rol `"admin"` pueden acceder a `/gestor`.
* Laravel aplica **middlewares** de autorización para validar roles.

#### 🚫 Protección

* Intentos de acceso no autorizado redirigen o muestran mensaje de error.

---

### 5. Buenas Prácticas

* Revisa regularmente los pedidos pendientes.
* Mantén las categorías bien organizadas.
* Modera los comentarios para preservar el respeto.
* Verifica los productos tras crearlos o editarlos.

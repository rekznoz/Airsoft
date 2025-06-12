import apiconfig from "../config/APIConfig.jsx"

/**
 * Servicio para interactuar con la API de pedidos.
 * Incluye métodos para obtener, crear, actualizar y consultar pedidos.
 */
export default class PedidosService {

    /**
     * Obtiene todos los pedidos desde la API.
     *
     * @returns {Promise<Array>} Array con todos los pedidos.
     * @throws {Error} Si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getPedidos() {
        try {
            const response = await fetch(apiconfig.pedidos)

            if (!response.ok) {
                throw new Error('Error al obtener los pedidos: ' + response.statusText)
            }

            const data = await response.json()

            if (!data || !data["data"]) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }

            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Obtiene todos los pedidos asociados a un usuario específico.
     *
     * @param {Object} params - Parámetros de la consulta.
     * @param {number|string} params.id - ID del usuario.
     * @returns {Promise<Array>} Array con los pedidos del usuario.
     * @throws {Error} Si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getPedidosUsuario({params}) {
        try {
            const response = await fetch(apiconfig.pedidos + "?user_id=" + params.id)

            if (!response.ok) {
                throw new Error('Error al obtener los productos: ' + response.statusText)
            }

            const data = await response.json()

            if (!data || !data["data"]) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }

            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Obtiene un pedido específico por su ID.
     *
     * @param {Object} params - Parámetros de la consulta.
     * @param {number|string} params.id - ID del pedido.
     * @returns {Promise<Object>} Datos del pedido solicitado.
     * @throws {Error} Si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getPedido({params}) {
        try {
            const response = await fetch(apiconfig.pedidos + "/" + params.id)

            if (!response.ok) {
                throw new Error('Error al obtener los productos: ' + response.statusText)
            }

            const data = await response.json()

            if (!data || !data["data"]) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }

            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Actualiza un pedido existente.
     *
     * @param {Object} params - Parámetros para la actualización.
     * @param {string} params.access_token - Token de autorización.
     * @param {number|string} params.id - ID del pedido a actualizar.
     * @param {Object} params.user - Usuario asociado al pedido.
     * @param {number|string} params.user.id - ID del usuario.
     * @param {Object} params.producto - Producto asociado al pedido.
     * @param {number|string} params.producto.id - ID del producto.
     * @param {string} params.direccion_envio - Dirección de envío.
     * @param {number} params.cantidad - Cantidad solicitada.
     * @param {string} params.estado - Estado del pedido.
     *
     * @returns {Promise<Object>} Respuesta del servidor con el pedido actualizado.
     * @throws {Error} Si la actualización falla o hay errores de validación.
     */
    static async updatePedido({params}) {
        try {
            const response = await fetch(`${apiconfig.pedidos}/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify({
                    user_id: params.user.id,
                    producto_id: params.producto.id,
                    direccion_envio: params.direccion_envio,
                    cantidad: params.cantidad,
                    estado: params.estado
                })
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data)
                throw new Error(`Error al actualizar el pedidos: ${data.message || 'Validación fallida'}`)
            }

            return data
        } catch (error) {
            console.error("Error en updatePedido:", error)
            throw error
        }
    }

    /**
     * Crea un nuevo pedido.
     *
     * @param {Object} params - Parámetros para la creación.
     * @param {string} params.access_token - Token de autorización.
     * @param {Object} params.user - Usuario que realiza el pedido.
     * @param {number|string} params.user.id - ID del usuario.
     * @param {Object} params.producto - Producto solicitado.
     * @param {number|string} params.producto.id - ID del producto.
     * @param {string} params.direccion_envio - Dirección de envío.
     * @param {number} params.cantidad - Cantidad solicitada.
     * @param {string} params.estado - Estado inicial del pedido.
     *
     * @returns {Promise<Object>} Respuesta del servidor con el pedido creado.
     * @throws {Error} Si la creación falla o hay errores de validación.
     */
    static async createPedido({params}) {
        try {
            const response = await fetch(apiconfig.pedidos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify({
                    user_id: params.user.id,
                    producto_id: params.producto.id,
                    direccion_envio: params.direccion_envio,
                    cantidad: params.cantidad,
                    estado: params.estado
                })
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data)
                throw new Error(`Error al crear el pedido: ${data.message || 'Validación fallida'}`)
            }

            return data
        } catch (error) {
            console.error("Error en createPedido:", error)
            throw error
        }
    }

}

import apiconfig from "../config/APIConfig.jsx"

/**
 * Servicio para interactuar con la API de productos.
 * Contiene métodos estáticos para obtener, crear, actualizar y eliminar productos.
 */
export default class ProductoService {

    /**
     * Obtiene la lista completa de productos desde la API.
     *
     * @returns {Promise<Array>} Array con los productos obtenidos.
     * @throws {Error} Lanza error si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getProductos() {
        try {
            const response = await fetch(apiconfig.productos)

            if (!response.ok) {
                throw new Error('Error al obtener los productos: ' + response.statusText)
            }

            const data = await response.json()

            if (!data || !data.data) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }

            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Obtiene un producto específico por su ID.
     *
     * @param {Object} params - Parámetros para la consulta.
     * @param {number|string} params.id - ID del producto a obtener.
     *
     * @returns {Promise<Object>} Objeto con los datos del producto.
     * @throws {Error} Lanza error si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getProducto({params}) {
        try {
            const response = await fetch(apiconfig.productos + "/" + params.id)

            if (!response.ok) {
                throw new Error('Error al obtener el producto: ' + response.statusText)
            }

            const data = await response.json()

            if (!data || !data.data) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }

            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Elimina un producto específico por su ID.
     *
     * @param {Object} params - Parámetros para la eliminación.
     * @param {string} params.access_token - Token de autorización.
     * @param {number|string} params.id - ID del producto a eliminar.
     *
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa.
     * @throws {Error} Lanza error si la respuesta no es correcta.
     */
    static async deleteProducto({params}) {
        console.log(params)
        try {
            const response = await fetch(apiconfig.productos + "/" + params.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                }
            })

            if (!response.ok) {
                throw new Error('Error al eliminar el producto: ' + response.statusText)
            }

            return true
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Crea un nuevo producto enviando un formulario con datos y archivos.
     *
     * @param {Object} params - Parámetros para la creación.
     * @param {FormData} params.formData - Datos del producto en formato FormData.
     * @param {string} params.token - Token de autorización Bearer.
     *
     * @returns {Promise<Object>} Respuesta con los datos del producto creado.
     * @throws {Error} Lanza error si la validación o la creación fallan.
     */
    static async postProducto({formData, token}) {
        try {
            const response = await fetch(apiconfig.productos, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data)
                throw new Error(`Error al crear el producto: ${data.message || 'Validación fallida'}`)
            }

            return data
        } catch (error) {
            console.error("Error en postProducto:", error)
            throw error
        }
    }

    /**
     * Actualiza un producto existente enviando un formulario con datos y archivos.
     * Utiliza la técnica de _method=PUT para compatibilidad con Laravel.
     *
     * @param {Object} params - Parámetros para la actualización.
     * @param {number|string} params.id - ID del producto a actualizar.
     * @param {FormData} params.formData - Datos del producto en formato FormData.
     * @param {string} params.token - Token de autorización Bearer.
     *
     * @returns {Promise<Object>} Datos del producto actualizado.
     * @throws {Error} Lanza error si la validación o la actualización fallan.
     */
    static async putProducto({id, formData, token}) {
        formData.append('_method', 'PUT') // Clave para Laravel

        try {
            const response = await fetch(apiconfig.productos + "/" + id, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data)
                throw new Error(`Error al actualizar el producto: ${data.message || 'Validación fallida'}`)
            }

            return data["data"]
        } catch (error) {
            console.error("Error en putProducto:", error)
            throw error
        }
    }
}

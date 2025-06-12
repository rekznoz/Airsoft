import apiconfig from "../config/APIConfig.jsx"

/**
 * Servicio para interactuar con la API de categorías.
 * Proporciona métodos estáticos para obtener, crear y eliminar categorías.
 */
export default class CategoriasService {

    /**
     * Obtiene la lista de categorías desde la API.
     *
     * @returns {Promise<Array>} Un array con las categorías obtenidas.
     * @throws {Error} Lanza un error si la respuesta no es correcta o los datos están mal formateados.
     */
    static async getCategorias() {
        try {
            const response = await fetch(apiconfig.categorias)

            if (!response.ok) {
                throw new Error('Error al obtener las categorias: ' + response.statusText)
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
     * Envía una nueva categoría a la API para su creación.
     *
     * @param {Object} params - Parámetros para la creación de la categoría.
     * @param {string} params.access_token - Token de autorización para la API.
     * @param {string} params.nombre - Nombre de la nueva categoría.
     * @param {string} params.descripcion - Descripción de la nueva categoría.
     *
     * @returns {Promise<Object>} La categoría creada.
     * @throws {Error} Lanza un error si la respuesta no es correcta o los datos están mal formateados.
     */
    static async postCategoria({params}) {
        try {
            const response = await fetch(apiconfig.categorias, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                },
                body: JSON.stringify({
                    nombre: params.nombre,
                    descripcion: params.descripcion
                })
            })

            if (!response.ok) {
                throw new Error('Error al agregar la categoria: ' + response.statusText)
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
     * Elimina una categoría específica por su ID.
     *
     * @param {Object} params - Parámetros para la eliminación.
     * @param {string} params.access_token - Token de autorización para la API.
     * @param {number|string} params.id - ID de la categoría a eliminar.
     *
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa.
     * @throws {Error} Lanza un error si la respuesta no es correcta.
     */
    static async deleteCategoria({params}) {
        try {
            const response = await fetch(apiconfig.categorias + "/" + params.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                }
            })

            if (!response.ok) {
                throw new Error('Error al eliminar el comentario: ' + response.statusText)
            }

            return true
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}

import apiconfig from "../config/APIConfig.jsx"

/**
 * Servicio para interactuar con la API de comentarios.
 * Proporciona métodos estáticos para obtener, crear, actualizar y eliminar comentarios.
 */
export default class ComentariosService {

    /**
     * Obtiene todos los comentarios que están verificados.
     *
     * @returns {Promise<Array>} Array con los comentarios verificados.
     * @throws {Error} Lanza error si la respuesta es incorrecta o los datos están mal formateados.
     */
    static async getComentariosVerificados() {
        try {
            const response = await fetch(apiconfig.comentarios + "?verificado=1")

            if (!response.ok) {
                throw new Error('Error al obtener los comentarios: ' + response.statusText)
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
     * Obtiene todos los comentarios que no están verificados.
     *
     * @returns {Promise<Array>} Array con los comentarios no verificados.
     * @throws {Error} Lanza error si la respuesta es incorrecta o los datos están mal formateados.
     */
    static async getComentariosNoVerificados() {
        try {
            const response = await fetch(apiconfig.comentarios + "?verificado=false")

            if (!response.ok) {
                throw new Error('Error al obtener los comentarios: ' + response.statusText)
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
     * Obtiene los comentarios de un usuario específico.
     *
     * @param {Object} params - Parámetros para la consulta.
     * @param {number|string} params.id - ID del usuario cuyos comentarios se desean obtener.
     *
     * @returns {Promise<Array>} Array con los comentarios del usuario.
     * @throws {Error} Lanza error si la respuesta es incorrecta o los datos están mal formateados.
     */
    static async getComentariosUsuario({params}) {
        try {
            const response = await fetch(apiconfig.comentarios + "?user_id=" + params.id)

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
     * Crea un nuevo comentario en la API.
     *
     * @param {Object} params - Parámetros para crear el comentario.
     * @param {string} params.access_token - Token de autorización.
     * @param {number|string} params.user_id - ID del usuario que hace el comentario.
     * @param {number|string} params.producto_id - ID del producto comentado.
     * @param {string} params.comentario - Texto del comentario.
     * @param {number} params.calificacion - Calificación del producto.
     *
     * @returns {Promise<Object>} Comentario creado.
     * @throws {Error} Lanza error si la respuesta es incorrecta o los datos están mal formateados.
     */
    static async postComentario({params}) {
        try {

            const response = await fetch(apiconfig.comentarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                },
                body: JSON.stringify({
                    user_id: params.user_id,
                    producto_id: params.producto_id,
                    comentario: params.comentario,
                    calificacion: params.calificacion
                })
            })

            if (!response.ok) {
                throw new Error('Error al agregar el comentario: ' + response.statusText)
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
     * Actualiza un comentario existente.
     *
     * @param {Object} params - Parámetros para la actualización.
     * @param {string} params.access_token - Token de autorización.
     * @param {number|string} params.id - ID del comentario a actualizar.
     * @param {Object} params.user - Objeto usuario con propiedad `id`.
     * @param {Object} params.producto - Objeto producto con propiedad `id`.
     * @param {string} params.comentario - Texto actualizado del comentario.
     * @param {number} params.calificacion - Calificación actualizada.
     * @param {boolean} params.verificado - Estado de verificación del comentario.
     *
     * @returns {Promise<Object>} Comentario actualizado.
     * @throws {Error} Lanza error si la respuesta es incorrecta o la validación falla.
     */
    static async putComentario({params}) {
        try {
            const response = await fetch(apiconfig.comentarios + "/" + params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                },
                body: JSON.stringify({
                    user_id: params.user.id,
                    producto_id: params.producto.id,
                    comentario: params.comentario,
                    calificacion: params.calificacion,
                    verificado: params.verificado
                })
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data)
                throw new Error(`Error al actualizar el pedidos: ${data.message || 'Validación fallida'}`)
            }

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
     * Elimina un comentario específico.
     *
     * @param {Object} params - Parámetros para la eliminación.
     * @param {string} params.access_token - Token de autorización.
     * @param {number|string} params.id - ID del comentario a eliminar.
     *
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa.
     * @throws {Error} Lanza error si la respuesta es incorrecta.
     */
    static async deleteComentario({params}) {
        try {
            const response = await fetch(apiconfig.comentarios + "/" + params.id, {
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

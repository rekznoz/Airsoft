/*
    {
      "id": 1,
      "user": {
        "id": 1,
        "nombre": "Admin"
      },
      "producto": {
        "id": 15,
        "nombre": "laboriosam suscipit fugiat"
      },
      "comentario": "Ad laborum eum reprehenderit deleniti voluptate.",
      "calificacion": 10,
      "created_at": "2025-05-19T16:57:56.000000Z",
      "updated_at": "2025-05-19T16:57:56.000000Z"
    },
*/

import apiconfig from "../config/APIConfig.jsx";

export default class ComentariosService {

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

    // Metodo para agregar un comentario
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

    // Metodo para editar un comentario
    static async putComentario({params}) {
        try {
            const response = await fetch(apiconfig.comentarios + "/" + params.id, {
                method: 'PUT',
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
                throw new Error('Error al editar el comentario: ' + response.statusText)
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

}
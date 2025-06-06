import apiconfig from "../config/APIConfig.jsx"

export default class CategoriasService {

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
                throw new Error('Error al eliminar la categoria: ' + response.statusText)
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
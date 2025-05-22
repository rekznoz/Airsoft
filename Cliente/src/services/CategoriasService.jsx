import apiconfig from "../config/APIConfig.jsx";

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

}
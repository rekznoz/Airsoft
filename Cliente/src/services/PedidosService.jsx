
/*
{
    "id": 1,
    "user": {
      "id": 2,
      "nombre": "D. Gerard Solorzano"
    },
    "producto": {
      "id": 12,
      "nombre": "error atque fugiat"
    },
    "direccion_envio": "Ruela Giménez, 311, 23º F, 07987, Ruíz de San Pedro",
    "cantidad": 2,
    "estado": "cancelado",
    "created_at": "2025-05-23T14:25:57.000000Z",
    "updated_at": "2025-05-23T14:25:57.000000Z"
}
*/

import apiconfig from "../config/APIConfig.jsx"

export default class PedidosService {

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

    static async updatePedido({params}) {
        try {
            const response = await fetch(`${apiconfig.pedidos}/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify(
                    {
                        user_id: params.user.id,
                        producto_id: params.producto.id,
                        direccion_envio: params.direccion_envio,
                        cantidad: params.cantidad,
                        estado: params.estado
                    }
                )
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

    static async createPedido({params}) {
        try {
            const response = await fetch(apiconfig.pedidos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify(
                    {
                        user_id: params.user.id,
                        producto_id: params.producto.id,
                        direccion_envio: params.direccion_envio,
                        cantidad: params.cantidad,
                        estado: params.estado
                    }
                )
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
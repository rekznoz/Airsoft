/*
{
  "data": {
    "id": 10,
    "nombre": "DDDDDDD",
    "descripcion": "CCCCCCC",
    "precio": "123.00",
    "descuento": "3.32",
    "precio_final": 119.68,
    "stock": 1,
    "categoria": {
      "id": 3,
      "nombre": "Munición"
    },
    "marca": "BBBBBBB",
    "modelo": "AAAAAAA",
    "fps": 369,
    "calibre": "5.5 mm",
    "capacidad_cargador": 48,
    "peso": 1.62,
    "imagenes": [
      "https://via.placeholder.com/640x480.png/003355?text=voluptas",
      "https://via.placeholder.com/640x480.png/00ddcc?text=et"
    ],
    "video_demo": "https://www.elizondo.es/voluptatem-ut-nostrum-amet-quo-eveniet",
    "tiempo_envio": "24h",
    "estado_activo": true,
    "array_comentarios": [
      {
        "id": 11,
        "user": {
          "id": 6,
          "name": "Unai Carvajal"
        },
        "comentario": "Dolor illum aperiam quidem velit quo eos fugiat exercitationem.",
        "calificacion": 9,
        "created_at": "2025-05-06 13:43:11"
      },
      {
        "id": 19,
        "user": {
          "id": 5,
          "name": "Ing. Carlos Brito Segundo"
        },
        "comentario": "Consequatur consequatur dolores quibusdam voluptatem exercitationem quam occaecati eligendi.",
        "calificacion": 2,
        "created_at": "2025-05-06 13:43:11"
      },
      {
        "id": 28,
        "user": {
          "id": 8,
          "name": "Marc Aguilera Tercero"
        },
        "comentario": "Excepturi quae occaecati laudantium deleniti nesciunt nobis in.",
        "calificacion": 9,
        "created_at": "2025-05-06 13:43:11"
      },
      {
        "id": 46,
        "user": {
          "id": 7,
          "name": "Luis Valadez"
        },
        "comentario": "Laborum quam eum earum voluptatem et.",
        "calificacion": 1,
        "created_at": "2025-05-06 13:43:11"
      },
      {
        "id": 50,
        "user": {
          "id": 9,
          "name": "Srta. Francisca Colunga"
        },
        "comentario": "Ratione aut quam voluptatem asperiores.",
        "calificacion": 4,
        "created_at": "2025-05-06 13:43:11"
      }
    ],
    "created_at": "2025-05-06 13:43:10",
    "updated_at": "2025-05-06 15:56:15"
  }
}
*/

import apiconfig from "../config/APIConfig.jsx"

export default class ProductoService {

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

    static async postProducto({ formData, token }) {

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch(apiconfig.productos, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // NO pongas Content-Type, fetch lo pone solo
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data);
                throw new Error(`Error al crear el producto: ${data.message || 'Validación fallida'}`);
            }

            return data;
        } catch (error) {
            console.error("Error en postProducto:", error);
            throw error;
        }
    }



    static async updateProducto({params}) {
        console.log("Enviando datos del producto para actualizar:", params)

        try {
            const response = await fetch(`${apiconfig.productos}/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify({
                    nombre: params.nombre,
                    descripcion: params.descripcion,
                    precio: params.precio,
                    descuento: params.descuento,
                    precio_final: params.precio_final,
                    stock: params.stock,
                    categoria_id: params.categoria,
                    marca: params.marca,
                    modelo: params.modelo,
                    fps: params.fps,
                    calibre: params.calibre,
                    capacidad_cargador: params.capacidad_cargador,
                    peso: params.peso,
                    imagenes: params.imagenes,
                    video_demo: params.video_demo,
                    tiempo_envio: params.tiempo_envio,
                    estado_activo: params.estado_activo
                })
            })

            const data = await response.json()

            if (!response.ok) {
                console.error("Errores de validación del backend:", data.errors || data);
                throw new Error(`Error al actualizar el producto: ${data.message || 'Validación fallida'}`);
            }

            return data // o true si prefieres
        } catch (error) {
            console.error("Error en updateProducto:", error)
            throw error
        }
    }


}
import apiconfig from "../config/APIConfig.jsx";

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

export async function getItemsTienda() {
    try {

        const response = await fetch(apiconfig.productos)

        if (!response.ok) {
            throw new Error('Error al obtener los productos: ' + response.statusText)
        }

        const data = await response.json()

        if (!data || !data.data) {
            throw new Error('Error: Datos no encontrados o mal formateados')
        }

        // Ordenar alfabeticamente
        //const productos = data.data.sort((a, b) => a["nombre"].localeCompare(b["nombre"]))
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
        return { productos: null, error: error.message }
    }
}
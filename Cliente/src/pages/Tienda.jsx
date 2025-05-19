import {Link, useLoaderData} from "react-router-dom";
import {useEffect, useState} from "react";
import "../css/tienda.css";
import useProductosStore from "../context/ProductosC.jsx";
import Spinner from "../components/Spinner.jsx";

/*
{
  "data": {
    "id": 1,
    "nombre": "velit quo dolor",
    "descripcion": "Officia et id corrupti fugit occaecati ipsa excepturi nostrum libero magnam.",
    "precio": "671.66",
    "descuento": "97.68",
    "precio_final": 573.98,
    "stock": 64,
    "categoria": {
      "id": 3,
      "nombre": "Munición"
    },
    "marca": "Marcos y Lucero",
    "modelo": "MODEL-06WK",
    "fps": 391,
    "calibre": "4.5 mm",
    "capacidad_cargador": 166,
    "peso": 1.58,
    "imagenes": [
      "https://via.placeholder.com/640x480.png/008866?text=consequatur",
      "https://via.placeholder.com/640x480.png/0077ff?text=rem"
    ],
    "video_demo": "http://www.marin.com/",
    "tiempo_envio": "48h",
    "estado_activo": true,
    "array_comentarios": [
      {
        "id": 3,
        "user": {
          "id": 7,
          "name": "Dr. Rayan Jaimes Hijo"
        },
        "comentario": "A qui praesentium ipsam.",
        "calificacion": 4,
        "created_at": "2025-05-18 11:42:16"
      },
      {
        "id": 11,
        "user": {
          "id": 10,
          "name": "Izan Alonso"
        },
        "comentario": "Suscipit rerum aspernatur est asperiores ut porro.",
        "calificacion": 4,
        "created_at": "2025-05-18 11:42:16"
      },
      {
        "id": 22,
        "user": {
          "id": 9,
          "name": "Leo Macías"
        },
        "comentario": "Quia illo totam qui dolorem quia.",
        "calificacion": 1,
        "created_at": "2025-05-18 11:42:16"
      }
    ],
    "created_at": "2025-05-18 11:42:16",
    "updated_at": "2025-05-18 11:42:16"
  }
}
*/

const PRODUCTOS_POR_PAGINA = 6;

export default function Tienda() {

    const {productos, cargarProductos, cargando} = useProductosStore();
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        cargarProductos()
    }, [cargarProductos]);

    if (cargando) return (
        <Spinner/>
    )
    if (productos.length === 0) return <p>No hay productos disponibles.</p>;

    const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosPagina = productos.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <div className="tienda">

            <div className="productos">
                {productosPagina.map((producto) => (
                    <Link to={`/tienda/${producto.id}`} key={producto.id} className="producto">
                        <img src="https://i.imgur.com/yMVfJZD.jpeg" alt={producto.nombre}/>
                        <h2>{producto.nombre}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio_final}</p>
                        <p>Stock: {producto.stock}</p>
                    </Link>
                ))}
            </div>

            <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                    ⬅ Anterior
                </button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                    Siguiente ➡
                </button>
            </div>

        </div>
    );
}


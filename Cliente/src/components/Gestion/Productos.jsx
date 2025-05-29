/*
{
  "id": 1,
  "nombre": "enim placeat quia",
  "descripcion": "Iste illo nihil excepturi voluptate est velit sit sint iusto rerum.",
  "precio": "201.07",
  "descuento": "6.82",
  "precio_final": 194.25,
  "stock": 78,
  "categoria": {
    "id": 3,
    "nombre": "Munición"
  },
  "marca": "Laureano de Monroy y Flia.",
  "modelo": "MODEL-20ZI",
  "fps": 151,
  "calibre": "6 mm",
  "capacidad_cargador": 116,
  "peso": 4.74,
  "imagenes": [
    "https://via.placeholder.com/640x480.png/00bb99?text=animi",
    "https://via.placeholder.com/640x480.png/00ccbb?text=ipsam"
  ],
  "video_demo": "http://arenas.es/quos-nisi-sequi-velit-at-quis-quam.html",
  "tiempo_envio": "24h",
  "estado_activo": false,
  "array_comentarios": [],
  "created_at": "2025-05-23 14:25:57",
  "updated_at": "2025-05-23 14:25:57"
}
*/

import {useState} from "react";
import {Link} from "react-router-dom";

export default function Productos({productos}) {
    const [listaProductos, setListaProductos] = useState(productos);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 8;

    const totalPaginas = Math.ceil(listaProductos.length / productosPorPagina);

    const eliminarProducto = (id) => {
        if (window.confirm("¿Eliminar este producto?")) {
            const nuevaLista = listaProductos.filter(p => p.id !== id);
            setListaProductos(nuevaLista);
            if (paginaActual > 1 && (paginaActual - 1) * productosPorPagina >= nuevaLista.length) {
                setPaginaActual(paginaActual - 1); // Evita quedarse en una página vacía
            }
        }
    };

    const editarProducto = (producto) => {
        console.log("Editar producto:", producto);
        // Aquí abrirías un modal o rediriges al formulario de edición
    };

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    const productosAMostrar = listaProductos.slice(
        (paginaActual - 1) * productosPorPagina,
        paginaActual * productosPorPagina
    );

    return (
        <div>

            <div className="grid-container">
                {productosAMostrar.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <Link to={`/tienda/${producto.id}`}>
                            <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre}/>
                        </Link>
                        <h3>{producto.nombre}</h3>
                        <p><strong>Stock:</strong> {producto.stock}</p>
                        <p className={producto.estado_activo ? "activo" : "inactivo"}>
                            {producto.estado_activo ? "Activo" : "Inactivo"}
                        </p>
                        <div className="acciones">
                            <button onClick={() => editarProducto(producto)}>Editar</button>
                            <button onClick={() => eliminarProducto(producto.id)} className="eliminar">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
                {[...Array(totalPaginas)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => cambiarPagina(i + 1)}
                        className={paginaActual === i + 1 ? "activo" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}>Siguiente
                </button>
            </div>

        </div>
    );
}

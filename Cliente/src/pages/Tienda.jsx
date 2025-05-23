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
    ],
    "created_at": "2025-05-18 11:42:16",
    "updated_at": "2025-05-18 11:42:16"
  }
}
*/

/* CATEGORIAS */

/*
[
    {
        "nombre": "Airsoft",
        "descripcion": "Productos de categoría: Airsoft",
        "array_productos": [
        ],
        "created_at": "2025-05-19 16:57:55",
        "updated_at": "2025-05-19 16:57:55"
    },
    {
        "nombre": "Réplica de armas",
        "descripcion": "Productos de categoría: Réplica de armas",
        "array_productos": [
        ],
        "created_at": "2025-05-19 16:57:55",
        "updated_at": "2025-05-19 16:57:55"
    },
    {
        "nombre": "Munición",
        "descripcion": "Productos de categoría: Munición",
        "array_productos": [
        ],
        "created_at": "2025-05-19 16:57:55",
        "updated_at": "2025-05-19 16:57:55"
    },
    {
        "nombre": "Accesorios",
        "descripcion": "Productos de categoría: Accesorios",
        "array_productos": [
        ],
        "created_at": "2025-05-19 16:57:55",
        "updated_at": "2025-05-19 16:57:55"
    },
    {
        "nombre": "Ropa táctica",
        "descripcion": "Productos de categoría: Ropa táctica",
        "array_productos": [
        ],
        "created_at": "2025-05-19 16:57:55",
        "updated_at": "2025-05-19 16:57:55"
    }
]
 */

const PRODUCTOS_POR_PAGINA = 6;

export default function Tienda() {

    const [filtroTexto, setFiltroTexto] = useState("");
    const [filtroPrecioMax, setFiltroPrecioMax] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroStock, setFiltroStock] = useState(false);
    
    const {productos, cargarProductos, cargando} = useProductosStore();
    const [paginaActual, setPaginaActual] = useState(1);
    const categorias = useLoaderData()

    const filtrarProductos = () => {
        return productos.filter(producto => {
            // Filtro texto (nombre o modelo)
            const texto = filtroTexto.toLowerCase();
            const coincideTexto = producto.nombre.toLowerCase().includes(texto) || producto.modelo.toLowerCase().includes(texto);

            // Filtro precio máximo
            const precioOk = filtroPrecioMax === "" || parseFloat(producto.precio_final) <= parseFloat(filtroPrecioMax);

            // Filtro categoría
            const categoriaOk = filtroCategoria === "" || producto.categoria.nombre === filtroCategoria;

            // Filtro stock
            const stockOk = !filtroStock || producto.stock > 0;

            return coincideTexto && precioOk && categoriaOk && stockOk;
        });
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [filtroTexto, filtroPrecioMax, filtroCategoria, filtroStock]);

    useEffect(() => {
        cargarProductos().catch(
            (error) => {
                console.error("Error al cargar los productos:", error);
            }
        )
    }, []);

    if (cargando) return (
        <Spinner/>
    )
    if (productos.length === 0) return <p>No hay productos disponibles.</p>;

    const productosFiltrados = filtrarProductos();
    const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosPagina = productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <div className="tienda">
            <div className="tienda-contenido">

                {/* Filtros */}
                <aside className="filtros">

                    {/* Filtro por Nombre, Modelo, etc. */}
                    <div className="filtro">
                        <label>Buscar:</label>
                        <input
                            type="text"
                            placeholder="Nombre, modelo..."
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                        />
                    </div>

                    {/* Filtro por Precio */}
                    <div className="filtro">
                        <label>Precio máximo:</label>
                        <input
                            type="number"
                            placeholder="Ej. 200"
                            value={filtroPrecioMax}
                            onChange={(e) => setFiltroPrecioMax(e.target.value)}
                        />
                    </div>

                    {/* Filtro por Categoría */}
                    <div className="filtro">
                        <label>Categoría:</label>
                        <select
                            value={filtroCategoria}
                            onChange={(e) => setFiltroCategoria(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {
                                categorias.map((categoria) => (
                                    <option key={categoria.nombre} value={categoria.nombre}>
                                        {categoria.nombre}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Filtro por Stock */}
                    <div className="filtro">
                        <label>
                            <input
                                type="checkbox"
                                checked={filtroStock}
                                onChange={(e) => setFiltroStock(e.target.checked)}
                            />
                            <span> Solo disponibles</span>
                        </label>
                    </div>

                    {/* Boton de Limpiar Filtros */}
                    <button className="btn-limpiar-filtros" onClick={() => {
                        setFiltroTexto("");
                        setFiltroPrecioMax("");
                        setFiltroCategoria("");
                        setFiltroStock(false);
                    }}>
                        Limpiar filtros
                    </button>
                </aside>
                
                {/* Productos */}
                <div className="productos">
                    {productosPagina.map((producto) => (
                        <Link to={`/tienda/${producto.id}`} key={producto.id} className="producto">
                            <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre}/>
                            <h2>{producto.nombre}</h2>
                            <p>{producto.descripcion.length > 80 ? producto.descripcion.slice(0, 80) + '…' : producto.descripcion}</p>
                            <p>Precio: ${producto.precio_final?.toFixed(2)}</p>
                            <p>Stock: {producto.stock}</p>
                        </Link>
                    ))}
                </div>

            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        ⬅ Anterior
                    </button>
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        Siguiente ➡
                    </button>
                </div>
            )}
        </div>
    );

}


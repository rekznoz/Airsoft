import {Link, useLoaderData} from "react-router-dom"
import {useEffect, useState} from "react"
import "../css/tienda.css"
import carritoStore from "../context/CarritoStore.jsx"
import {corregirUrlImagen} from "../hooks/corregirUrlImagen.jsx"

const PRODUCTOS_POR_PAGINA = 6

/**
 * Componente Tienda
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra una tienda con productos filtrables y paginables.
 */
export default function Tienda() {

    const addToCart = carritoStore(state => state.addToCart)

    const {productos, categorias} = useLoaderData()

    const [filtroTexto, setFiltroTexto] = useState("")
    const [filtroPrecioMax, setFiltroPrecioMax] = useState("")
    const [filtroCategoria, setFiltroCategoria] = useState("")
    const [filtroStock, setFiltroStock] = useState(false)
    const [paginaActual, setPaginaActual] = useState(1)

    const filtrarProductos = () => {
        return productos.filter(producto => {
            // Filtro texto (nombre o modelo)
            const texto = filtroTexto.toLowerCase()
            const coincideTexto = producto.nombre.toLowerCase().includes(texto) || producto.modelo.toLowerCase().includes(texto)

            // Filtro precio máximo
            const precioOk = filtroPrecioMax === "" || parseFloat(producto.precio_final) <= parseFloat(filtroPrecioMax)

            // Filtro categoría
            const categoriaOk = filtroCategoria === "" || producto.categoria.nombre === filtroCategoria

            // Filtro stock
            const stockOk = !filtroStock || producto.stock > 0

            // Filtrar por estado_activo
            const estadoActivo = producto.estado_activo === true

            return coincideTexto && precioOk && categoriaOk && stockOk && estadoActivo
        })
    }

    useEffect(() => {
        setPaginaActual(1)
    }, [filtroTexto, filtroPrecioMax, filtroCategoria, filtroStock])

    const productosFiltrados = filtrarProductos()
    const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA)
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA
    const productosPagina = productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina)
        }
    }

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
                        setFiltroTexto("")
                        setFiltroPrecioMax("")
                        setFiltroCategoria("")
                        setFiltroStock(false)
                    }}>
                        Limpiar filtros
                    </button>
                </aside>

                {/* Productos */}
                <div className="productos">
                    {productosPagina.map((producto) => (
                        <div key={producto.id} className="producto">
                            <Link to={`/tienda/${producto.id}`}>
                                {producto.imagenes.length > 0 ?
                                    <img src={corregirUrlImagen(producto.imagenes[0])} alt={producto.nombre}/>
                                    :
                                    <img src="https://placehold.co/600x400/EEE/31343C" alt={producto.nombre}/>
                                }
                            </Link>
                            <h2>{producto.nombre}</h2>
                            <p>{producto.descripcion.length > 80 ? producto.descripcion.slice(0, 80) + '…' : producto.descripcion}</p>
                            <p>Precio: ${producto.precio_final?.toFixed(2)}</p>
                            <p>Stock: {producto.stock}</p>
                            {producto.stock > 0 ?
                                <button className="btn-comprar constock" onClick={() => addToCart(producto)}>
                                    Añadir al carrito
                                </button>
                                :
                                <button className="btn-comprar nostock" disabled>
                                    Sin stock
                                </button>
                            }
                        </div>
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
    )

}


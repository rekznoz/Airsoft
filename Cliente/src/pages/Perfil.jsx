import usuarioStore from "../context/UsuarioStore.jsx"
import {Link, useLoaderData} from "react-router-dom"
import Spinner from "../components/Spinner.jsx"

import "../css/perfil.css"
import {useEffect, useState} from "react"

/**
 * Hook para manejar la paginación de una lista de items.
 * @param items
 * @param porPagina
 * @returns {{pagina: number, totalPaginas: number, itemsPaginados: *, siguiente: (function(): *), anterior: (function(): *)}}
 */
function usePaginacion(items, porPagina) {
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        setPagina(1)
    }, [items])

    const totalPaginas = Math.ceil(items.length / porPagina)
    const indiceInicial = (pagina - 1) * porPagina
    const itemsPaginados = items.slice(indiceInicial, indiceInicial + porPagina)

    const siguiente = () => pagina < totalPaginas && setPagina(pagina + 1)
    const anterior = () => pagina > 1 && setPagina(pagina - 1)

    return {
        pagina,
        totalPaginas,
        itemsPaginados,
        siguiente,
        anterior,
    }
}

/**
 * Componente de paginación para el perfil del usuario.
 * @param pagina
 * @param totalPaginas
 * @param anterior
 * @param siguiente
 * @returns {JSX.Element}
 */
function Paginacion({pagina, totalPaginas, anterior, siguiente}) {
    return (
        <div className="perfil-paginacion">
            <button onClick={anterior} disabled={pagina === 1}>⬅</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button onClick={siguiente} disabled={pagina === totalPaginas}>➡</button>
        </div>
    )
}

/**
 * Componente de perfil de usuario.
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra el perfil del usuario, incluyendo sus pedidos y comentarios realizados.
 */
export default function Perfil() {

    const user = usuarioStore(state => state.user)
    const {pedidos, comentarios, usuario} = useLoaderData()

    const pagPedidos = usePaginacion(pedidos, 3)
    const pagComentarios = usePaginacion(comentarios, 3)

    if (!user || !pedidos || !Array.isArray(pedidos) || !comentarios || !Array.isArray(comentarios)) {
        return <Spinner/>
    }

    return (
        <div className="perfil-contenedor">

            <div className="perfil-header carta-perfil">
                <div className="perfil-info">
                    <h2>👤 Perfil de Usuario</h2>
                    <p><strong>Nombre:</strong> {usuario.name}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                </div>
                {
                    user === usuario.id ? (
                        <div className="perfil-acciones">
                            <button onClick={() => alert('Editar perfil no implementado')}>Editar Perfil</button>
                        </div>
                    ) : (
                        <></>
                    )
                }

            </div>

            <div className="perfil-seccion carta-perfil">
                <h3>📦 Pedidos Realizados</h3>
                {pedidos.length > 0 ? (
                    <>
                        <ul className="perfil-lista-objetos">
                            {pagPedidos.itemsPaginados.map((pedido) => (
                                <li key={pedido.id} className="perfil-objeto">
                                    <div className="perfil-objeto-informacion">
                                        <p><strong>ID:</strong> {pedido.id}</p>
                                        <p>
                                            <strong>Fecha:</strong> {new Date(pedido.created_at).toLocaleDateString("es-ES")}
                                        </p>
                                        <p><strong>Producto:</strong> {pedido.producto.nombre}</p>
                                        <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
                                        <p><strong>Estado:</strong> {pedido.estado}</p>
                                    </div>
                                    <div className="perfil-botones">
                                        <Link to={`/pedido/${pedido.id}`}>
                                            <button className="btn-ver">Ver Pedido</button>
                                        </Link>
                                        <Link to={`/tienda/${pedido.producto.id}`}>
                                            <button className="btn-ver">Ver Producto</button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Paginacion
                            pagina={pagPedidos.pagina}
                            totalPaginas={pagPedidos.totalPaginas}
                            anterior={pagPedidos.anterior}
                            siguiente={pagPedidos.siguiente}
                        />
                    </>
                ) : <p>No tienes pedidos realizados.</p>}
            </div>

            <div className="perfil-seccion carta-perfil">
                <h3>💬 Comentarios Realizados</h3>
                {comentarios.length > 0 ? (
                    <>
                        <ul className="perfil-lista-objetos">
                            {pagComentarios.itemsPaginados.map((comentario) => (
                                <li key={comentario.id} className="perfil-objeto">
                                    <div className="perfil-objeto-informacion">
                                        <p><strong>ID:</strong> {comentario.id}</p>
                                        <p>
                                            <strong>Fecha:</strong> {new Date(comentario.created_at).toLocaleDateString("es-ES")}
                                        </p>
                                        <p><strong>Producto:</strong> {comentario.producto.nombre}
                                        </p>
                                        <p><strong>Comentario:</strong> {comentario.comentario}</p>
                                        <p><strong>Calificación:</strong> {comentario.calificacion}/10</p>
                                    </div>
                                    <div className="perfil-botones">
                                        <Link to={`/tienda/${comentario.producto.id}`}>
                                            <button className="btn-ver">Ver Producto</button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Paginacion
                            pagina={pagComentarios.pagina}
                            totalPaginas={pagComentarios.totalPaginas}
                            anterior={pagComentarios.anterior}
                            siguiente={pagComentarios.siguiente}
                        />
                    </>
                ) : <p>No tienes comentarios realizados.</p>}
            </div>

        </div>

    )
}
import useUserStore from "../context/AuthC.jsx"
import {Link, useLoaderData} from "react-router-dom"
import Spinner from "../components/Spinner.jsx"

import "../css/perfil.css"
import {useEffect, useState} from "react"

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

function Paginacion({ pagina, totalPaginas, anterior, siguiente }) {
    return (
        <div className="perfil-paginacion">
            <button onClick={anterior} disabled={pagina === 1}>⬅</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button onClick={siguiente} disabled={pagina === totalPaginas}>➡</button>
        </div>
    )
}

export default function Perfil() {

    const user = useUserStore(state => state.user)
    const {pedidos, comentarios, usuario} = useLoaderData()

    const pagPedidos = usePaginacion(pedidos, 3)
    const pagComentarios = usePaginacion(comentarios, 3)

    if (!user || !pedidos || !Array.isArray(pedidos) || !comentarios || !Array.isArray(comentarios)) {
        return <Spinner />;
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
                    user.id === usuario.id ? (
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
                                    <p><strong>ID:</strong> {pedido.id}</p>
                                    <p><strong>Fecha:</strong> {new Date(pedido.created_at).toLocaleDateString("es-ES")}</p>
                                    <p><strong>Producto:</strong> <Link to={`/tienda/${pedido.producto.id}`}>{pedido.producto.nombre}</Link></p>
                                    <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
                                    <p><strong>Estado:</strong> {pedido.estado}</p>
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
                                    <p><strong>ID:</strong> {comentario.id}</p>
                                    <p><strong>Fecha:</strong> {new Date(comentario.created_at).toLocaleDateString("es-ES")}</p>
                                    <p><strong>Producto:</strong> <Link to={`/tienda/${comentario.producto.id}`}>{comentario.producto.nombre}</Link></p>
                                    <p><strong>Comentario:</strong> {comentario.comentario}</p>
                                    <p><strong>Calificación:</strong> {comentario.calificacion}/10</p>
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
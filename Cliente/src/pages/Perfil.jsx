import useUserStore from "../context/AuthC.jsx"
import {Link, useLoaderData} from "react-router-dom"
import Spinner from "../components/Spinner.jsx"

import "../css/perfil.css"
import {useEffect, useState} from "react"

/* PEDIDOS */
/*
{
      "id": 19,
      "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@admin.com",
        "email_verified_at": "2025-05-19T16:57:55.000000Z",
        "created_at": "2025-05-19T16:57:56.000000Z",
        "updated_at": "2025-05-19T16:57:56.000000Z"
      },
      "producto": {
        "id": 16,
        "nombre": "iusto ducimus qui",
        "descripcion": "Maiores iste architecto similique vitae optio voluptatibus.",
        "precio": "582.29",
        "stock": 78,
        "categoria_id": 2,
        "marca": "Arellano y Delapaz",
        "modelo": "MODEL-67LA",
        "descuento": "42.26",
        "fps": 292,
        "calibre": "4.5 mm",
        "capacidad_cargador": 28,
        "peso": 2.7,
        "imagenes": [
          "https://via.placeholder.com/640x480.png/0066ff?text=reprehenderit",
          "https://via.placeholder.com/640x480.png/00ccdd?text=voluptatem"
        ],
        "video_demo": "http://solano.com.es/temporibus-totam-eum-officia-rerum-distinctio-distinctio-voluptas",
        "tiempo_envio": "24h",
        "estado_activo": true,
        "created_at": "2025-05-19T16:57:56.000000Z",
        "updated_at": "2025-05-19T16:57:56.000000Z"
      },
      "direccion_envio": "Calle Leire, 51, 6º 9º, 80183, Dávila del Bages",
      "cantidad": 6,
      "estado": "entregado",
      "created_at": "2025-05-19T16:57:56.000000Z",
      "updated_at": "2025-05-19T16:57:56.000000Z"
    },
}
*/

/* COMENTARIOS */
/*
{
  "id": 1,
  "user": {
    "id": 1,
    "nombre": "Admin"
  },
  "producto": {
    "id": 15,
    "nombre": "laboriosam suscipit fugiat"
  },
  "comentario": "Ad laborum eum reprehenderit deleniti voluptate.",
  "calificacion": 10,
  "created_at": "2025-05-19T16:57:56.000000Z",
  "updated_at": "2025-05-19T16:57:56.000000Z"
},
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


export default function Perfil() {

    const user = useUserStore(state => state.user)
    const {pedidos, comentarios} = useLoaderData()

    const pagPedidos = usePaginacion(pedidos, 3)
    const pagComentarios = usePaginacion(comentarios, 3)

    if (!user) {
        return <Spinner/>
    }

    if (!pedidos || !Array.isArray(pedidos)) {
        return <Spinner/>
    }

    if (!comentarios || !Array.isArray(comentarios)) {
        return <Spinner/>
    }

    return (
        <div className="perfil-contenedor">

            <div className="perfil-header carta-perfil">
                <div className="perfil-info">
                    <h2>👤 Perfil de Usuario</h2>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="perfil-acciones">
                    <button onClick={() => alert('Editar perfil no implementado')}>Editar Perfil</button>
                </div>
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
                        <div className="perfil-paginacion">
                            <button onClick={pagPedidos.anterior} disabled={pagPedidos.pagina === 1}>⬅</button>
                            <span>Página {pagPedidos.pagina} de {pagPedidos.totalPaginas}</span>
                            <button onClick={pagPedidos.siguiente} disabled={pagPedidos.pagina === pagPedidos.totalPaginas}>➡</button>
                        </div>
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
                        <div className="perfil-paginacion">
                            <button onClick={pagComentarios.anterior} disabled={pagComentarios.pagina === 1}>⬅</button>
                            <span>Página {pagComentarios.pagina} de {pagComentarios.totalPaginas}</span>
                            <button onClick={pagComentarios.siguiente} disabled={pagComentarios.pagina === pagComentarios.totalPaginas}>➡</button>
                        </div>
                    </>
                ) : <p>No tienes comentarios realizados.</p>}
            </div>

        </div>

    )
}
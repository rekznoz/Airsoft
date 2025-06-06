/*
{
    "id": 1,
    "user": {
      "id": 5,
      "nombre": "Ignacio Abrego"
    },
    "producto": {
      "id": 1,
      "nombre": "enim placeat quia"
    },
    "comentario": "Necessitatibus dolores accusamus dolorum sunt quo consequuntur est.",
    "calificacion": 4,
    "created_at": "2025-05-23T14:25:58.000000Z",
    "updated_at": "2025-05-23T14:25:58.000000Z"
}
*/

import {useEffect, useMemo, useState} from "react"
import Paginacion from "./Paginacion.jsx"
import Estrellas from "../Producto/Estrellas.jsx"
import {Link} from "react-router-dom"

import "../../css/gestion/comentarios.css"
import Swal from "sweetalert2"
import ComentariosService from "../../services/ComentariosService.jsx"
import usuarioStore from "../../context/UsuarioStore.jsx"

export default function Comentarios({comentarios}) {

    const cantidadPorPagina = 5
    const [rangoVisible, setRangoVisible] = useState({start: 0, end: cantidadPorPagina, pagina: 1})
    const access_token = usuarioStore(state => state.access_token)
    const [listaComentarios, setListaComentarios] = useState(comentarios)

    const comentariosVisibles = useMemo(() => {
        return listaComentarios.slice(rangoVisible.start, rangoVisible.end)
    }, [listaComentarios, rangoVisible])

    useEffect(() => {
        setListaComentarios(comentarios)
    }, [comentarios])


    const onEditar = (id) => {
        // Aquí puedes implementar la lógica para editar el comentario
        console.log("Editar comentario:", id)
    }

    const onEliminar = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar este comentario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                ComentariosService.deleteComentario({params: {id: id, access_token: access_token}})
                    .then(() => {
                        Swal.fire('Eliminado', 'El comentario ha sido eliminado.', 'success')
                        setListaComentarios(prev => prev.filter(c => c.id !== id))
                    })
                    .catch(error => {
                        Swal.fire('Error', 'No se pudo eliminar el comentario.', 'error')
                    })
            }
        })
    }

    return (
        <div className="comentarios-contenedor">
            {comentarios.length > 0 ? (
                <>
                    {comentariosVisibles.map((comentario) => (
                        <div key={comentario.id} className="comentario-tarjeta">
                            <div className="comentario-header">
                                <div>
                                    <strong>Usuario:</strong>{" "}
                                    <Link to={`/perfil/${comentario.user.id}`}>
                                        {comentario.user.nombre}
                                    </Link>
                                </div>
                                <div>
                                    <strong>Producto:</strong>{" "}
                                    <Link to={`/tienda/${comentario.producto.id}`}>
                                        {comentario.producto.nombre}
                                    </Link>
                                </div>
                            </div>

                            <div className="comentario-cuerpo">
                                <p className="comentario-texto">{comentario.comentario}</p>
                            </div>

                            <div className="comentario-footer">
                                <span className="comentario-fecha">
                                    {new Date(comentario.created_at).toLocaleDateString()}
                                </span>
                                <Estrellas calificacion={comentario.calificacion}/>
                            </div>

                            <div className="comentario-acciones">
                                <button className="btn-editar" onClick={() => onEditar(comentario.id)}>
                                    Editar
                                </button>
                                <button className="btn-eliminar" onClick={() => onEliminar(comentario.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Paginación */}
                    {comentarios.length > cantidadPorPagina && (
                        <Paginacion
                            totalItems={comentarios.length}
                            itemsPerPage={cantidadPorPagina}
                            onPageChange={(rango) => setRangoVisible(rango)}
                        />
                    )}

                </>
            ) : (
                <p>No hay comentarios disponibles.</p>
            )}
        </div>
    )
}

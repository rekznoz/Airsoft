
import {useEffect, useMemo, useState} from "react"
import Paginacion from "./Paginacion.jsx"
import Estrellas from "../Producto/Estrellas.jsx"
import {Link} from "react-router-dom"

import "../../css/gestion/comentarios.css"
import Swal from "sweetalert2"
import ComentariosService from "../../services/ComentariosService.jsx"
import usuarioStore from "../../context/UsuarioStore.jsx"

/**
 * Componente para gestionar comentarios de productos.
 * @param comentarios
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente permite visualizar, verificar y eliminar comentarios de productos.
 * @param {Array} comentarios - Lista de comentarios a gestionar.
 */
export default function Comentarios({comentarios}) {

    const cantidadPorPagina = 5
    const [rangoVisible, setRangoVisible] = useState({start: 0, end: cantidadPorPagina, pagina: 1})
    const access_token = usuarioStore(state => state.access_token)
    const [listaComentarios, setListaComentarios] = useState(comentarios)

    const comentariosVisibles = useMemo(() => {
        return listaComentarios.slice(rangoVisible.start, rangoVisible.end)
    }, [listaComentarios, rangoVisible])

    useEffect(() => {
        if (comentarios.length !== listaComentarios.length) {
            setListaComentarios(comentarios)
        }
    }, [comentarios])

    useEffect(() => {
        if (rangoVisible.start >= listaComentarios.length && listaComentarios.length > 0) {
            const nuevaPagina = Math.max(1, Math.ceil(listaComentarios.length / cantidadPorPagina))
            const nuevoStart = (nuevaPagina - 1) * cantidadPorPagina
            setRangoVisible({ start: nuevoStart, end: nuevoStart + cantidadPorPagina, pagina: nuevaPagina })
        }
    }, [listaComentarios])


    const onVerificar = (comentario) => {
        Swal.fire({
            title: 'Verificar Comentario',
            text: `¿Deseas verificar el comentario de ${comentario.user.nombre} sobre ${comentario.producto.nombre}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, verificar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                ComentariosService.putComentario(
                    {params: { ...comentario, access_token, verificado: true} }
                ).then(() => {
                    Swal.fire('Verificado', 'El comentario ha sido verificado.', 'success')
                    setListaComentarios(prev => prev.filter(c => c.id !== comentario.id))
                }).catch(error => {
                    Swal.fire('Error', 'No se pudo verificar el comentario.', 'error')
                })
            }
        })
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
            {listaComentarios.length > 0 ? (
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
                                <button type="button" className="btn-editar" onClick={() => onVerificar(comentario)}>
                                    Verificar
                                </button>
                                <button type="button" className="btn-eliminar" onClick={() => onEliminar(comentario.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Paginación */}
                    {comentarios.length > cantidadPorPagina && (
                        <Paginacion
                            totalItems={listaComentarios.length}
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

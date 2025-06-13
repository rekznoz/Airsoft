import {Link} from "react-router-dom"
import {useEffect, useMemo, useState} from "react"

import ComentariosService from "../../services/ComentariosService.jsx"
import usuarioStore from "../../context/UsuarioStore.jsx"
import validarComentario from "../../hooks/validarComentario.jsx"
import FormularioNuevoComentario from "./Comentarios/FormularioNuevoComentario.jsx"
import ComentarioItem from "./Comentarios/ComentarioItem.jsx"
import Swal from "sweetalert2";

/**
 * Componente para mostrar comentarios paginados de un producto.
 * @param comentarios
 * @param producto
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente permite visualizar los comentarios de un producto, paginarlos y agregar nuevos comentarios.
 * @param {Array} comentarios - Lista de comentarios del producto.
 * @param {Object} producto - Objeto que representa el producto al que pertenecen los comentarios.
 */
export default function ComentariosPaginados({comentarios, producto}) {

    const access_token = usuarioStore(state => state.access_token)
    const isLoggedIn = usuarioStore(state => state.logueado)
    const user = usuarioStore(state => state.user)

    const [pagina, setPagina] = useState(1)
    const porPagina = 4
    const totalPaginas = useMemo(() => Math.ceil(comentarios.length / porPagina), [comentarios])
    const comentariosPagina = useMemo(() => comentarios.slice((pagina - 1) * porPagina, pagina * porPagina), [comentarios, pagina])

    const yaComento = comentarios.some(c => c.user.id === user?.id)

    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0)
    const [nuevoComentario, setNuevoComentario] = useState("")
    const [enviando, setEnviando] = useState(false)

    const [comentarioEditando, setComentarioEditando] = useState(null)
    const [comentarioEditado, setComentarioEditado] = useState("")
    const [calificacionEditada, setCalificacionEditada] = useState(0)

    const manejarEditar = (comentario) => {
        setComentarioEditando(comentario.id)
        setComentarioEditado(comentario.comentario)
        setCalificacionEditada(comentario.calificacion / 2)
    }

    const manejarGuardarEdicion = (e, comentarioEdit) => {
        e.preventDefault()

        const datosEditados = {
            comentario: comentarioEditado,
            calificacion: calificacionEditada * 2,
        }

        ComentariosService.putComentario({
            params: {id: comentarioEdit.id, access_token, ...datosEditados, user_id: user.id, producto_id: producto.id},
        }).then(res => {
            if (res) {
                const index = comentarios.findIndex(c => c.id === comentarioEdit.id)
                if (index !== -1) {
                    comentarios[index].comentario = res.comentario
                    comentarios[index].calificacion = res.calificacion
                }
                setComentarioEditando(null)
            } else {
                console.error("Error al editar el comentario")
            }
        }).catch(error => {
            console.error("Error al editar el comentario:", error)
        })
    }

    const manejarEnvio = (e) => {
        e.preventDefault()

        if (!validarComentario(nuevoComentario, calificacionSeleccionada)) return

        const comentario = {
            user_id: user.id,
            producto_id: producto.id,
            comentario: nuevoComentario,
            calificacion: calificacionSeleccionada * 2,
        }
        setEnviando(true)

        ComentariosService.postComentario({params: {access_token, ...comentario}}).then(res => {
            if (res) {
                setNuevoComentario("")
                setPagina(1)
                const nuevoComentario = {
                    id: res.id,
                    user: {
                        id: user.id,
                        name: user.name,
                    },
                    comentario: res.comentario,
                    calificacion: res.calificacion,
                    created_at: res.created_at,
                }
                comentarios.unshift(nuevoComentario)
            } else {
                console.error("Error al agregar el comentario")
            }
        }).catch(error => {
            console.error("Error al agregar el comentario:", error)
        }).finally(() => {
            setEnviando(false)
            setCalificacionSeleccionada(0)
            setNuevoComentario("")
            Swal.fire(
                'Comentario enviado',
                'Tu comentario ha sido enviado y será revisado por nuestro equipo.',
                'success'
            )
        })
    }

    useEffect(() => {
        //window.scrollTo({top: 0, behavior: 'smooth'})
        //window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
    }, [pagina])

    return (
        <section className="producto-comentarios">

            <h2>Comentarios ({comentarios.filter(c => c.verificado).length})</h2>

            {isLoggedIn && !yaComento && (
                <FormularioNuevoComentario
                    onSubmit={manejarEnvio}
                    comentario={nuevoComentario}
                    setComentario={setNuevoComentario}
                    calificacion={calificacionSeleccionada}
                    setCalificacion={setCalificacionSeleccionada}
                    enviando={enviando}
                />
            )}

            {comentarios.length > 0 && (
                <ul className="lista-comentarios">
                    {comentariosPagina
                        .filter(comentario => comentario.verificado === 1)
                        .map(comentario => (
                            <ComentarioItem
                                key={comentario.id}
                                comentario={comentario}
                                esUsuarioActual={comentario.user.id === user?.id}
                                enEdicion={comentarioEditando === comentario.id}
                                manejarEditar={manejarEditar}
                                manejarGuardarEdicion={manejarGuardarEdicion}
                                cancelarEdicion={() => setComentarioEditando(null)}
                                comentarioEditado={comentarioEditado}
                                setComentarioEditado={setComentarioEditado}
                                calificacionEditada={calificacionEditada}
                                setCalificacionEditada={setCalificacionEditada}
                            />
                        ))}
                </ul>
            )}


            {comentarios.length > porPagina && (
                <div className="paginacion-comentarios">
                    <button
                        onClick={() => setPagina(p => Math.max(p - 1, 1))}
                        disabled={pagina === 1}
                        aria-label="Página anterior"
                    >
                        Anterior
                    </button>

                    <span>Página {pagina} de {totalPaginas}</span>

                    <button
                        onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                        aria-label="Página siguiente"
                        disabled={pagina === totalPaginas}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </section>
    )
}

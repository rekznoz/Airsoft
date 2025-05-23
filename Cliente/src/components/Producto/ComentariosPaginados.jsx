import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import ComentariosService from "../../services/ComentariosService.jsx";
import useUserStore from "../../context/AuthC.jsx";
import Swal from "sweetalert2";
import Estrellas from "./Estrellas.jsx";

export default function ComentariosPaginados({comentarios, producto}) {

    const access_token = useUserStore(state => state.access_token);
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const user = useUserStore(state => state.user);

    const [pagina, setPagina] = useState(1);
    const porPagina = 4;
    const totalPaginas = Math.ceil(comentarios.length / porPagina);
    const comentariosPagina = comentarios.slice((pagina - 1) * porPagina, pagina * porPagina);

    const yaComento = comentarios.some(c => c.user.id === user?.id);

    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [enviando, setEnviando] = useState(false);

    const [comentarioEditando, setComentarioEditando] = useState(null);
    const [comentarioEditado, setComentarioEditado] = useState("");
    const [calificacionEditada, setCalificacionEditada] = useState(0);

    const manejarEditar = (comentario) => {
        setComentarioEditando(comentario.id);
        setComentarioEditado(comentario.comentario);
        setCalificacionEditada(comentario.calificacion / 2);
    };

    const manejarGuardarEdicion = (e, comentarioEdit) => {
        e.preventDefault();

        const datosEditados = {
            comentario: comentarioEditado,
            calificacion: calificacionEditada * 2,
        };

        ComentariosService.putComentario({
            params: {id: comentarioEdit.id, access_token, ...datosEditados, user_id: user.id, producto_id: producto.id},
        }).then(res => {
            if (res) {
                const index = comentarios.findIndex(c => c.id === comentarioEdit.id);
                if (index !== -1) {
                    comentarios[index].comentario = res.comentario;
                    comentarios[index].calificacion = res.calificacion;
                }
                setComentarioEditando(null);
            } else {
                console.error("Error al editar el comentario");
            }
        }).catch(error => {
            console.error("Error al editar el comentario:", error);
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (nuevoComentario.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El comentario no puede estar vacío.",
            })
        }
        if (calificacionSeleccionada === 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes seleccionar una calificación.",
            })
            return;
        }

        const comentario = {
            user_id: user.id,
            producto_id: producto.id,
            comentario: nuevoComentario,
            calificacion: calificacionSeleccionada * 2,
        };
        setEnviando(true);

        ComentariosService.postComentario({params: {access_token, ...comentario}}).then(res => {
            if (res) {
                setNuevoComentario("");
                setPagina(1);
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
                comentarios.unshift(nuevoComentario);
            } else {
                console.error("Error al agregar el comentario");
            }
        }).catch(error => {
            console.error("Error al agregar el comentario:", error);
        }).finally(() => {
            setEnviando(false);
            setCalificacionSeleccionada(0);
            setNuevoComentario("");
        })
    };

    useEffect(() => {
        //window.scrollTo({top: 0, behavior: 'smooth'});
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    }, [pagina]);

    return (
        <section className="producto-comentarios">
            <h2>Comentarios ({comentarios.length})</h2>

            {isLoggedIn && !yaComento && (
                <form onSubmit={manejarEnvio} className="formulario-comentario">
                    <Estrellas
                        interactivas
                        valorSeleccionado={calificacionSeleccionada}
                        setValor={setCalificacionSeleccionada}
                    />

                    <textarea
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        rows={4}
                        required
                    />
                    <button type="submit" disabled={enviando}>Enviar comentario</button>
                </form>
            )}

            <ul className="lista-comentarios">
                {comentariosPagina.map(comentario => (
                    <li key={comentario.id}>
                        <p>
                            <strong><Link to={`/perfil/${comentario.user.id}`}>{comentario.user.name}</Link></strong>
                            <Estrellas calificacion={comentario.calificacion}/>
                            {comentario.user.id === user?.id && (
                                <button
                                    onClick={() => manejarEditar(comentario)}
                                    className="btn-editar-comentario"
                                >
                                    Editar
                                </button>
                            )}
                        </p>

                        {comentarioEditando === comentario.id ? (
                            <form
                                onSubmit={(e) => manejarGuardarEdicion(e, comentario)}
                                className="formulario-edicion"
                            >
                                <div className="selector-estrellas">
                                    <Estrellas
                                        interactivas
                                        valorSeleccionado={calificacionEditada}
                                        setValor={setCalificacionEditada}
                                    />
                                </div>
                                <textarea
                                    value={comentarioEditado}
                                    onChange={(e) => setComentarioEditado(e.target.value)}
                                    rows={3}
                                />
                                <button type="submit">Guardar</button>
                                <button type="button" onClick={() => setComentarioEditando(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <>
                                <p>{comentario.comentario}</p>
                                <time>{new Date(comentario.created_at).toLocaleString()}</time>
                            </>

                        )}

                    </li>
                ))}
            </ul>


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
    );
}

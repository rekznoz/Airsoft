import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import ComentariosService from "../../services/ComentariosService.jsx";
import useUserStore from "../../context/AuthC.jsx";
import Swal from "sweetalert2";

function Estrellas({calificacion, max = 5}) {
    const estrellasLlenas = Math.round((calificacion / 10) * max);
    const estrellas = [];

    for (let i = 1; i <= max; i++) {
        estrellas.push(
            <span key={i} style={{color: i <= estrellasLlenas ? "#f5b301" : "#ccc"}}>
                ★
            </span>
        );
    }

    return <span className="estrellas">{estrellas}</span>;
}

export default function ComentariosPaginados({comentarios, producto}) {

    const access_token = useUserStore(state => state.access_token);
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const user = useUserStore(state => state.user);

    const [pagina, setPagina] = useState(1);
    const porPagina = 4;
    const totalPaginas = Math.ceil(comentarios.length / porPagina);
    const comentariosPagina = comentarios.slice((pagina - 1) * porPagina, pagina * porPagina);

    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [nuevoComentario, setNuevoComentario] = useState("");

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
        });
    };

    useEffect(() => {
        //window.scrollTo({top: 0, behavior: 'smooth'});
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    }, [pagina]);

    return (
        <section className="producto-comentarios">
            <h2>Comentarios ({comentarios.length})</h2>

            {isLoggedIn && (
                <form onSubmit={manejarEnvio} className="formulario-comentario">
                    <div className="selector-estrellas">
                        {[1, 2, 3, 4, 5].map(valor => (
                            <span
                                key={valor}
                                onClick={() => setCalificacionSeleccionada(valor)}
                                style={{
                                    cursor: "pointer",
                                    color: valor <= calificacionSeleccionada ? "#f5b301" : "#ccc",
                                    fontSize: "1.5rem",
                                    marginRight: "0.2rem"
                                }}
                            >
                                ★
                            </span>
                        ))}
                        {calificacionSeleccionada > 0 && (
                            <span className="texto-calificacion">({calificacionSeleccionada * 2}/10)</span>
                        )}
                    </div>

                    <textarea
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        rows={4}
                        required
                    />
                    <button type="submit">Enviar comentario</button>
                </form>
            )}

            <ul className="lista-comentarios">
                {comentariosPagina.map(comentario => (
                    <li key={comentario.id}>
                        <p>
                            <strong><Link to={`/perfil/${comentario.user.id}`}>{comentario.user.name}</Link></strong>
                            <Estrellas calificacion={comentario.calificacion}/>
                        </p>
                        <p>{comentario.comentario}</p>
                        <time>{new Date(comentario.created_at).toLocaleString()}</time>
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

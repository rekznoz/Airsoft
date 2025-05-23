import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import ComentariosService from "../../services/ComentariosService.jsx";
import useUserStore from "../../context/AuthC.jsx";

/*
    static async postComentario({params}) {
        try {
            const response = await fetch(apiconfig.comentarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + params.access_token
                },
                body: JSON.stringify({
                    user_id: params.id,
                    producto_id: params.id,
                    comentario: params.comentario,
                    calificacion: params.calificacion
                })
            })
            if (!response.ok) {
                throw new Error('Error al agregar el comentario: ' + response.statusText)
            }
            const data = await response.json()
            if (!data || !data["data"]) {
                throw new Error('Error: Datos no encontrados o mal formateados')
            }
            return data["data"]
        } catch (error) {
            console.error(error)
            throw error
        }
    }
 */

export default function ComentariosPaginados({comentarios, producto}) {

    const access_token = useUserStore(state => state.access_token);
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const user = useUserStore(state => state.user);

    const [pagina, setPagina] = useState(1);
    const porPagina = 4;
    const totalPaginas = Math.ceil(comentarios.length / porPagina);
    const comentariosPagina = comentarios.slice((pagina - 1) * porPagina, pagina * porPagina);

    const [nuevoComentario, setNuevoComentario] = useState("");

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (nuevoComentario.trim() === "") return;

        const comentario = {
            user_id: user.id,
            producto_id: producto.id, // Cambia esto por el ID del producto correspondiente
            comentario: nuevoComentario,
            calificacion: 5, // Cambia esto por la calificación deseada
        };

        console.log(producto)

        ComentariosService.postComentario({params: {access_token, ...comentario}}).then(res => {
            if (res) {
                setNuevoComentario("");
                setPagina(1);
                console.log(res)
                // Aquí puedes actualizar el estado de los comentarios si es necesario
            } else {
                console.error("Error al agregar el comentario");
            }
        }).catch(error => {
            console.error("Error al agregar el comentario:", error);
        });
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pagina]);

    return (
        <section className="producto-comentarios">
            <h2>Comentarios ({comentarios.length})</h2>

            {isLoggedIn && (
                <form onSubmit={manejarEnvio} className="formulario-comentario">
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
                            <em> ({comentario.calificacion}/10)</em>
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

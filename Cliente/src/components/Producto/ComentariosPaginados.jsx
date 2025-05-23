import {Link} from "react-router-dom";
import {useState} from "react";

export default function ComentariosPaginados({comentarios}) {
    const [pagina, setPagina] = useState(1);
    const porPagina = 4;
    const totalPaginas = Math.ceil(comentarios.length / porPagina);

    const comentariosPagina = comentarios.slice((pagina - 1) * porPagina, pagina * porPagina);

    return (
        <section className="producto-comentarios">
            <h2>Comentarios ({comentarios.length})</h2>
            <ul style={{listStyle: "none", padding: 0}}>
                {comentariosPagina.map(comentario => (
                    <li key={comentario.id} style={{borderBottom: "1px solid #ddd", padding: "1rem 0"}}>
                        <p>
                            <strong><Link to={`/perfil/${comentario.user.id}`}>{comentario.user.name}</Link></strong>
                            <em> ({comentario.calificacion}/10)</em>
                        </p>
                        <p>{comentario.comentario}</p>
                        <p style={{fontSize: "0.8rem", color: "#999"}}>
                            {new Date(comentario.created_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>

            {comentarios.length > porPagina && (
                <div className="paginacion-comentarios">
                    <button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>Anterior</button>
                    <span>Página {pagina} de {totalPaginas}</span>
                    <button onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                            disabled={pagina === totalPaginas}>Siguiente
                    </button>
                </div>
            )}
        </section>
    );
}

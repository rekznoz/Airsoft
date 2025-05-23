import Estrellas from "../Estrellas.jsx";
import {Link} from "react-router-dom";

export default function ComentarioItem({ comentario, esUsuarioActual, enEdicion, manejarEditar, manejarGuardarEdicion, cancelarEdicion, comentarioEditado, setComentarioEditado, calificacionEditada, setCalificacionEditada }) {
    return (
        <li key={comentario.id}>
            <p>
                <strong><Link to={`/perfil/${comentario.user.id}`}>{comentario.user.name}</Link></strong>
                <Estrellas calificacion={comentario.calificacion}/>
                {esUsuarioActual && !enEdicion && (
                    <button onClick={() => manejarEditar(comentario)} className="btn-editar-comentario">Editar</button>
                )}
            </p>

            {enEdicion ? (
                <form onSubmit={(e) => manejarGuardarEdicion(e, comentario)} className="formulario-edicion">
                    <Estrellas interactivas valorSeleccionado={calificacionEditada} setValor={setCalificacionEditada} />
                    <textarea
                        value={comentarioEditado}
                        onChange={(e) => setComentarioEditado(e.target.value)}
                        rows={3}
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={cancelarEdicion}>Cancelar</button>
                </form>
            ) : (
                <>
                    <p>{comentario.comentario}</p>
                    <time>{new Date(comentario.created_at).toLocaleString()}</time>
                </>
            )}
        </li>
    );
}

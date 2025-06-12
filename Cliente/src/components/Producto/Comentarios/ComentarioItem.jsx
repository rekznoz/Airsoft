import Estrellas from "../Estrellas.jsx"
import {Link} from "react-router-dom"

/**
 * Componente para mostrar un comentario de producto.
 * @param comentario
 * @param esUsuarioActual
 * @param enEdicion
 * @param manejarEditar
 * @param manejarGuardarEdicion
 * @param cancelarEdicion
 * @param comentarioEditado
 * @param setComentarioEditado
 * @param calificacionEditada
 * @param setCalificacionEditada
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra un comentario de un producto, permitiendo al usuario editarlo si es el autor del comentario.
 * @param {Object} comentario - Objeto que contiene los detalles del comentario.
 * @param {boolean} esUsuarioActual - Indica si el comentario pertenece al usuario actual.
 * @param {boolean} enEdicion - Indica si el comentario está en modo edición.
 * @param {function} manejarEditar - Función para iniciar la edición del comentario.
 * @param {function} manejarGuardarEdicion - Función para guardar los cambios del comentario editado.
 * @param {function} cancelarEdicion - Función para cancelar la edición del comentario.
 * @param {string} comentarioEditado - Texto del comentario editado.
 * @param {function} setComentarioEditado - Función para actualizar el texto del comentario editado.
 * @param {number} calificacionEditada - Calificación editada del comentario.
 * @param {function} setCalificacionEditada - Función para actualizar la calificación editada.
 */
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
    )
}

import Estrellas from "../Estrellas.jsx"

/**
 * Componente para crear un nuevo comentario de producto.
 * @param onSubmit
 * @param comentario
 * @param setComentario
 * @param calificacion
 * @param setCalificacion
 * @param enviando
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente permite al usuario escribir un nuevo comentario y calificación para un producto.
 * @param {function} onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {string} comentario - Texto del comentario.
 * @param {function} setComentario - Función para actualizar el texto del comentario.
 * @param {number} calificacion - Calificación del comentario.
 * @param {function} setCalificacion - Función para actualizar la calificación del comentario.
 * @param {boolean} enviando - Indica si el formulario está siendo enviado.
 */
export default function FormularioNuevoComentario({ onSubmit, comentario, setComentario, calificacion, setCalificacion, enviando }) {
    return (
        <form onSubmit={onSubmit} className="formulario-comentario">
            <Estrellas interactivas valorSeleccionado={calificacion} setValor={setCalificacion} />
            <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                rows={4}
                required
            />
            <button type="submit" disabled={enviando}>Enviar comentario</button>
        </form>
    )
}

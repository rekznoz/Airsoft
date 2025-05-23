import Estrellas from "../Estrellas.jsx";

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
    );
}

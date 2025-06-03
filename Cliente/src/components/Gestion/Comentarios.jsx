export default function Comentarios({comentarios}) {
    return (
        <div className="comentarios-contenedor">
            <h1>Comentarios</h1>
            {comentarios.length > 0 ? (
                comentarios.map((comentario, index) => (
                    <div key={index} className="comentario">
                        <p><strong>{comentario.usuario}</strong>: {comentario.texto}</p>
                        <p><em>{new Date(comentario.fecha).toLocaleDateString()}</em></p>
                    </div>
                ))
            ) : (
                <p>No hay comentarios disponibles.</p>
            )}
        </div>
    )
}
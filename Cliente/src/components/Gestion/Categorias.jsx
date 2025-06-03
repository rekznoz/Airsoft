export default function Categorias({categorias}) {
    return (
        <div className="categorias-contenedor">
            <h1>Categorías</h1>
            {categorias.length > 0 ? (
                <ul className="lista-categorias">
                    {categorias.map((categoria, index) => (
                        <li key={index} className="categoria-item">
                            {categoria.nombre}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles.</p>
            )}
        </div>
    )
}
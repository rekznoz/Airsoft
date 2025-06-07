export default function ProductoDetalles({producto}) {
    return (
        <>
            <section className="producto-detalles">
                <h2>Especificaciones</h2>
                <ul>
                    <li><strong>Marca:</strong> {producto.marca}</li>
                    <li><strong>Modelo:</strong> {producto.modelo}</li>
                    <li><strong>Categoría:</strong> {producto.categoria?.nombre}</li>
                    <li><strong>FPS:</strong> {producto.fps}</li>
                    <li><strong>Calibre:</strong> {producto.calibre}</li>
                    <li><strong>Capacidad del cargador:</strong> {producto.capacidad_cargador}</li>
                    <li><strong>Peso:</strong> {producto.peso} kg</li>
                    <li><strong>Tiempo de envío:</strong> {producto.tiempo_envio}</li>
                    <li><strong>Stock:</strong> {producto.stock > 0 ? `${producto.stock} unidades` : "Agotado"}</li>
                </ul>
            </section>
        </>
    )
}

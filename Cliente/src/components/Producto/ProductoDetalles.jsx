export default function ProductoDetalles({producto}) {
    return (
        <>
            <section className="producto-detalles">
                <h2>Detalles</h2>
                <ul>
                    <li><strong>Precio base:</strong> {producto.precio} €</li>
                    <li><strong>Descuento:</strong> {producto.descuento} €</li>
                    <li><strong>Precio final:</strong> {producto.precio_final} €</li>
                    <li><strong>Stock:</strong> {producto.stock > 0 ? `${producto.stock} unidades` : "Agotado"}</li>
                    <li><strong>Tiempo de envío:</strong> {producto.tiempo_envio}</li>
                    <li><strong>Estado:</strong> {producto.estado_activo ? "Activo" : "Inactivo"}</li>
                </ul>
            </section>
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
                </ul>
            </section>
        </>
    )
}

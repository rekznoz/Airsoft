export default function ProductoDetalles({producto}) {
    return (
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
    );
}

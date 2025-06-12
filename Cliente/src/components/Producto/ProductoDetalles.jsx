/**
 * @file ProductoDetalles.jsx
 * @param producto
 * @returns {JSX.Element}
 * @constructor
 * @description Componente para mostrar los detalles de un producto.
 * Este componente muestra las especificaciones del producto, como marca, modelo, categoría, FPS, calibre, capacidad del cargador, peso, tiempo de envío y stock disponible.
 * @param {Object} producto - Objeto que contiene los detalles del producto.
 */
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

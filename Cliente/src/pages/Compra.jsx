import "../css/compra.css"
import carritoStore from "../context/CarritoStore.jsx"

export default function Compra() {

    const carrito = carritoStore(state => state.informacionCarrito)
    const totalItems = carritoStore(state => state.totalItems)
    const removeFromCart = carritoStore(state => state.removeFromCart)
    const clearCart = carritoStore(state => state.clearCart)

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId)
    }

    const handleClearCart = () => {
        clearCart()
    }

    return (
        <div className="resumen-compra">
            {carrito.length === 0 ? (
                <p className="resumen-vacio">No hay productos en el carrito.</p>
            ) : (
                <>
                    <h2>Resumen de tu pedido</h2>
                    <ul className="lista-productos">
                        <li className="producto-item header">
                            <span className="celda nombre">Producto</span>
                            <span className="celda precio">Precio</span>
                            <span className="celda cantidad">Cantidad</span>
                            <span className="celda subtotal">Subtotal</span>
                            <span className="celda accion">Acción</span>
                        </li>
                        {carrito.map(producto => (
                            <li key={producto.id} className="producto-item">
                                <span className="celda nombre" title={producto.nombre}>{producto.nombre}</span>
                                <span className="celda precio">${producto.precio.toFixed(2)}</span>
                                <span className="celda cantidad">{producto.cantidad || 1}</span>
                                <span
                                    className="celda subtotal">${((producto.precio) * (producto.cantidad || 1)).toFixed(2)}</span>
                                <button
                                    className="celda accion eliminar"
                                    onClick={() => handleRemoveFromCart(producto.id)}
                                    aria-label={`Eliminar ${producto.name} del carrito`}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="total-compra">
                        Total: $
                        {carrito.reduce((total, producto) => total + producto.precio * (producto.cantidad || 1), 0).toFixed(2)}
                    </div>
                    <button className="btn-comprar" onClick={handleClearCart}>
                        Finalizar compra
                    </button>
                </>
            )}
        </div>


    )

}
import "../css/compra.css"
import carritoStore from "../context/CarritoStore.jsx"
import {corregirUrlImagen} from "../hooks/corregirUrlImagen.jsx"
import {useState} from "react"
import PedidosService from "../services/PedidosService.jsx"
import UsuarioStore from "../context/UsuarioStore.jsx"

// Recoge los datos del formulario
import {Formik} from 'formik'
// https://formik.org/docs/overview

// Validar los datos del formulario con Yup
import {object, string} from 'yup'
import Swal from "sweetalert2"

const validationSchema = object({
    calle: string()
        .required('El campo calle es obligatorio')
        .min(3, 'La calle debe tener al menos 3 caracteres'),
    numero: string()
        .required('El campo número es obligatorio')
        .matches(/^\d+$/, 'El número debe ser un valor numérico'),
    ciudad: string()
        .required('El campo ciudad es obligatorio')
        .min(2, 'La ciudad debe tener al menos 2 caracteres'),
    provincia: string()
        .required('El campo provincia es obligatorio')
        .min(2, 'La provincia debe tener al menos 2 caracteres'),
    codigo_postal: string()
        .required('El campo código postal es obligatorio')
        .matches(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
})

export default function Compra() {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [direccion, setDireccion] = useState("")
    const [enviando, setEnviando] = useState(false)

    const carrito = carritoStore(state => state.informacionCarrito)
    const totalItems = carritoStore(state => state.totalItems)
    const removeFromCart = carritoStore(state => state.removeFromCart)
    const clearCart = carritoStore(state => state.clearCart)
    const access_token = UsuarioStore(state => state.access_token)
    const user = UsuarioStore(state => state.user)
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId)
    }

    const handleClearCart = () => {
        clearCart()
    }

    const handleConfirmarCompra = async (direccionFinal) => {
        if (direccionFinal.trim() === "") {
            alert("Por favor, introduce una dirección de envío válida.")
            return
        }

        if (carrito.length === 0) {
            alert("El carrito está vacío.")
            setMostrarModal(false)
            return
        }

        setEnviando(true)

        try {
            for (const producto of carrito) {
                await PedidosService.createPedido({
                    params: {
                        user,
                        producto,
                        direccion_envio: direccionFinal,
                        cantidad: producto.cantidad || 1,
                        estado: "pendiente",
                        access_token
                    }
                })
            }

            Swal.fire("¡Pedido realizado!", "Tu compra se ha procesado correctamente", "success")
            clearCart()
            setMostrarModal(false)
        } catch (error) {
            console.error("Error al crear pedido:", error)
            Swal.fire("Error", "Hubo un problema al procesar el pedido. Intenta de nuevo.", "error")
        } finally {
            setEnviando(false)
        }
    }

    const handleCheckout = () => {
        setMostrarModal(true)
    }

    return (
        <>
            <div className="resumen-compra">
                {carrito.length === 0 ? (
                    <p className="resumen-vacio">No hay productos en el carrito.</p>
                ) : (
                    <>
                        <h2>Resumen de tu pedido</h2>
                        <ul className="lista-productos">
                            <li className="producto-item header">
                                <span className="celda nombre"></span>
                                <span className="celda precio">Producto</span>
                                <span className="celda cantidad">Costo</span>
                                <span className="celda subtotal">Cantidad</span>
                                <span className="celda accion">Subtotal</span>
                            </li>
                            {carrito.map(producto => (
                                <li key={producto.id} className="producto-item">
                                <span className="celda imagen">
                                    {producto.imagenes?.length > 0 ?
                                        <img src={corregirUrlImagen(producto.imagenes[0])} alt={producto.nombre}/>
                                        :
                                        <img src="https://placehold.co/600x400/EEE/31343C" alt={producto.nombre}/>
                                    }
                                </span>
                                    <div className="detalle">
                                        <span className="celda nombre">{producto.nombre}</span>
                                        <span className="celda precio">Precio: ${producto.precio.toFixed(2)}</span>
                                        <span className="celda cantidad">Cantidad: {producto.cantidad || 1}</span>
                                        <span
                                            className="celda subtotal">Subtotal: ${(producto.precio * (producto.cantidad || 1)).toFixed(2)}</span>
                                        <button
                                            className="eliminar"
                                            onClick={() => handleRemoveFromCart(producto.id)}
                                            aria-label={`Eliminar ${producto.nombre} del carrito`}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="total-compra">
                            Total: ${total.toFixed(2)}
                        </div>
                        <button className="btn-comprar btn-vaciar" onClick={handleClearCart}>
                            Vaciar carrito
                        </button>
                        <button className="btn-comprar" onClick={handleCheckout}>
                            Finalizar compra
                        </button>
                    </>
                )}
            </div>

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h3>Introduce tu informacion de envío</h3>
                        <Formik
                            initialValues={{
                                calle: '',
                                numero: '',
                                ciudad: '',
                                provincia: '',
                                codigo_postal: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                const direccionFormateada = `${values.calle} ${values.numero}, ${values.ciudad}, ${values.provincia}, ${values.codigo_postal}`
                                handleConfirmarCompra(direccionFormateada)
                                setSubmitting(false)
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="calle">Calle</label>
                                        <input
                                            type="text"
                                            name="calle"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.calle}
                                        />
                                        {errors.calle && touched.calle && <div className="error">{errors.calle}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="numero">Número</label>
                                        <input
                                            type="text"
                                            name="numero"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.numero}
                                        />
                                        {errors.numero && touched.numero &&
                                            <div className="error">{errors.numero}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="ciudad">Ciudad</label>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ciudad}
                                        />
                                        {errors.ciudad && touched.ciudad &&
                                            <div className="error">{errors.ciudad}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="provincia">Provincia</label>
                                        <input
                                            type="text"
                                            name="provincia"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.provincia}
                                        />
                                        {errors.provincia && touched.provincia &&
                                            <div className="error">{errors.provincia}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="codigo_postal">Código Postal</label>
                                        <input
                                            type="text"
                                            name="codigo_postal"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.codigo_postal}
                                        />
                                        {errors.codigo_postal && touched.codigo_postal &&
                                            <div className="error">{errors.codigo_postal}</div>}
                                    </div>
                                    <div className="modal-botones">
                                        <button type="submit" className="btn-comprar" disabled={enviando}>
                                            {enviando ? "Enviando..." : "Confirmar"}
                                        </button>
                                        <button type="button" onClick={() => setMostrarModal(false)}
                                                className="btn-comprar btn-vaciar">
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    )
}
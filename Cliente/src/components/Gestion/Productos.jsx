import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Paginacion from "./Paginacion"
import Swal from "sweetalert2"
import ProductosService from "../../services/ProductoService.jsx"
import ProductoService from "../../services/ProductoService.jsx"
import usuarioStore from "../../context/UsuarioStore.jsx"
import "../../css/gestion/producto.css"
import {corregirUrlImagen} from "../../hooks/corregirUrlImagen.jsx"
import {ModalProducto} from "./ModalProducto.jsx";

/**
 * Componente para gestionar productos en la tienda.
 * @param productos
 * @param categorias
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente permite visualizar, crear, editar y eliminar productos de la tienda.
 * @param {Array} productos - Lista de productos a gestionar.
 * @param {Array} categorias - Lista de categorías disponibles para los productos.
 */
export default function Productos({productos, categorias}) {

    const access_token = usuarioStore(state => state.access_token)

    const [todosProductos, setTodosProductos] = useState(productos)
    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false)
    const [productosAMostrar, setProductosAMostrar] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    useEffect(() => {
        if (todosProductos.length) {
            setProductosAMostrar(todosProductos.slice(0, 6))
        }
    }, [todosProductos])

    const editarProducto = (producto) => {
        setProductoSeleccionado(producto)
    }

    const eliminarProducto = (id) => {
        Swal.fire(
            {
                title: '¿Estás seguro?',
                text: "¡No podrás deshacer esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar'
            }
        ).then((result) => {
                if (result.isConfirmed) {
                    // Aquí podrías hacer una petición al backend para eliminar el producto
                    ProductoService.deleteProducto({params: {id, access_token}}).then(
                        () => {
                            Swal.fire(
                                '¡Eliminado!',
                                'El producto ha sido eliminado.',
                                'success'
                            )
                            setProductosAMostrar(prev => prev.filter(p => p.id !== id))
                        }
                    ).catch(error => {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el producto: ' + error.message,
                            'error'
                        )
                    })
                }
            }
        )
    }

    return (
        <div className="producto-card-contenedor">

            <button onClick={() => setMostrarModalNuevo(true)} className="boton-nuevo-producto">
                + Nuevo Producto
            </button>

            <div className="grid-container">
                {productosAMostrar.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <Link to={`/tienda/${producto.id}`}>
                            {producto.imagenes.length > 0 ?
                                <img src={corregirUrlImagen(producto.imagenes[0])} alt={producto.nombre}/>
                                :
                                <img src="https://placehold.co/600x400/EEE/31343C" alt={producto.nombre}/>
                            }
                        </Link>
                        <h3>{producto.nombre}</h3>
                        <p><strong>Stock:</strong> {producto.stock}</p>
                        <p className={producto.estado_activo ? "activo" : "inactivo"}>
                            {producto.estado_activo ? "Activo" : "Inactivo"}
                        </p>
                        <div className="acciones">
                            <button onClick={() => editarProducto(producto)}>Editar</button>
                            <button onClick={() => eliminarProducto(producto.id)} className="eliminar">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            <Paginacion
                totalItems={todosProductos.length}
                itemsPerPage={6}
                onPageChange={({start, end}) => {
                    setProductosAMostrar(todosProductos.slice(start, end))
                }}
            />

            {mostrarModalNuevo && (
                <ModalProducto
                    modo="crear"
                    onClose={() => setMostrarModalNuevo(false)}
                    onSave={(productoNuevo) => {
                        ProductosService.postProducto({
                            token: access_token,
                            formData: productoNuevo // este ya contiene los campos convertidos
                        })
                    }}
                    categorias={categorias}
                />
            )}

            {productoSeleccionado && (
                <ModalProducto
                    modo="editar"
                    producto={productoSeleccionado}
                    onClose={() => setProductoSeleccionado(null)}
                    onSave={(formData) => {
                        ProductosService.putProducto({
                            token: access_token,
                            id: productoSeleccionado.id,
                            formData: formData
                        }).then((productoActualizado) => {
                            Swal.fire("¡Actualizado!", "El producto ha sido actualizado correctamente.", "success")
                            const productoViejo = productosAMostrar.find(p => p.id === productoSeleccionado.id)
                            setProductosAMostrar(prev => prev.map(p => p.id === productoViejo.id ? productoActualizado : p))
                            setTodosProductos (prev => prev.map(p => p.id === productoViejo.id ? productoActualizado : p))
                        }).catch((error) => {
                            Swal.fire("Error", "No se pudo actualizar el producto: " + error.message, "error")
                        })
                    }}
                    categorias={categorias}
                />
            )}

        </div>
    )
}
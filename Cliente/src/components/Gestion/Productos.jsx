import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Paginacion from "./Paginacion"
import {Field, Form, Formik} from "formik"
import Swal from "sweetalert2"
import ProductosService from "../../services/ProductoService.jsx"
import ProductoService from "../../services/ProductoService.jsx"
import usuarioStore from "../../context/UsuarioStore.jsx"
import {mixed, object, string} from "yup"
import "../../css/gestion/producto.css"
import {corregirUrlImagen} from "../../hooks/corregirUrlImagen.jsx"

const validationSchema = object({
    nombre: string().required('El nombre es obligatorio'),
    descripcion: string().required('La descripción es obligatoria').max(255, 'La descripción no puede exceder los 500 caracteres'),
    precio: string().required('El precio es obligatorio').matches(/^\d+(\.\d{1,2})?$/, 'El precio debe ser un número válido'),
    descuento: string().matches(/^\d+(\.\d{1,2})?$/, 'El descuento debe ser un número válido'),
    precio_final: string().matches(/^\d+(\.\d{1,2})?$/, 'El precio final debe ser un número válido'),
    stock: string().matches(/^\d+$/, 'El stock debe ser un número entero'),
    categoria_id: string().required('La categoría es obligatoria'),
    marca: string().required('La marca es obligatoria'),
    modelo: string().required('El modelo es obligatorio'),
    fps: string().matches(/^\d+$/, 'Los FPS deben ser un número entero'),
    calibre: string().required('El calibre es obligatorio'),
    capacidad_cargador: string().matches(/^\d+$/, 'La capacidad del cargador debe ser un número entero'),
    peso: string().matches(/^\d+(\.\d{1,2})?$/, 'El peso debe ser un número válido'),
    imagenes: mixed(),
    video_demo: string().matches(/^(https?:\/\/[^\s]+)?$/, 'El video de demostración debe ser una URL válida'),
    tiempo_envio: string().required('El tiempo de envío es obligatorio'),
    estado_activo: string().oneOf(['true', 'false'], 'El estado activo debe ser verdadero o falso'),
})

function ModalProducto({producto = null, onClose, onSave, modo = "editar", categorias}) {

    const [imagenesExistentes, setImagenesExistentes] = useState([])
    const [imagenesNuevas, setImagenesNuevas] = useState([])

    useEffect(() => {
        if (producto?.imagenes && producto.imagenes.length > 0) {
            const existentes = producto.imagenes.map((url, index) => ({
                id: `existente-${index}`,
                src: corregirUrlImagen(url),
            }))
            setImagenesExistentes(existentes)
        } else {
            setImagenesExistentes([])
        }
        setImagenesNuevas([])
    }, [producto])

    const valoresIniciales = {
        nombre: producto?.nombre || "",
        descripcion: producto?.descripcion || "",
        precio: producto?.precio || 0,
        descuento: producto?.descuento || 0,
        precio_final: producto?.precio_final || 0,
        stock: producto?.stock || 0,
        categoria_id: producto?.categoria?.id || 0,
        marca: producto?.marca || "",
        modelo: producto?.modelo || "",
        fps: producto?.fps || 0,
        calibre: producto?.calibre || "",
        capacidad_cargador: producto?.capacidad_cargador || 0,
        peso: producto?.peso || 0,
        imagenes: [],
        video_demo: producto?.video_demo || "",
        tiempo_envio: producto?.tiempo_envio || "",
        estado_activo: producto?.estado_activo || false,
    }

    const handleSubmit = async (valores) => {
        const formData = new FormData()

        // Campos normales
        for (const clave in valores) {
            if (clave !== "imagenes" && clave !== "estado_activo") {
                formData.append(clave, valores[clave])
            }
        }
        formData.append('estado_activo', valores.estado_activo ? '1' : '0')

        previewImages.forEach(img => {
            if (img.file) {
                formData.append('imagenes[]', img.file)
            }
        })

        onSave(formData)
        onClose()
    }

    const previewImages = [...imagenesExistentes, ...imagenesNuevas]

    return (
        <div className="modal-fondo">
            <div className="modal">
                <h2>{modo === "crear" ? "Publicar Nuevo Producto" : "Editar Producto"}</h2>

                <Formik
                    initialValues={valoresIniciales}
                    enableReinitialize
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({handleChange, handleBlur, values, errors, touched, isSubmitting, setFieldValue}) => (
                        <Form>
                            <div className="form-group-producto">
                                <label>Nombre:</label>
                                <Field type="text" name="nombre" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.nombre}/>
                                {errors.nombre && touched.nombre && <div className="error">{errors.nombre}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Descripción:</label>
                                <Field as="textarea" name="descripcion" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.descripcion}/>
                                {errors.descripcion && touched.descripcion &&
                                    <div className="error">{errors.descripcion}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Precio:</label>
                                <Field type="text" name="precio" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.precio}/>
                                {errors.precio && touched.precio && <div className="error">{errors.precio}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Descuento:</label>
                                <Field type="text" name="descuento" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.descuento}/>
                                {errors.descuento && touched.descuento &&
                                    <div className="error">{errors.descuento}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Precio Final:</label>
                                <Field type="text" name="precio_final" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.precio_final}/>
                                {errors.precio_final && touched.precio_final &&
                                    <div className="error">{errors.precio_final}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Stock:</label>
                                <Field type="text" name="stock" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.stock}/>
                                {errors.stock && touched.stock && <div className="error">{errors.stock}</div>}
                            </div>

                            {
                                categorias && categorias.length > 0 ? (
                                    <div className="form-group-producto">
                                        <label>Categoría:</label>
                                        <Field as="select" name="categoria_id" className="form-field"
                                               onChange={handleChange}
                                               onBlur={handleBlur} value={values.categoria_id}>
                                            <option value="">Selecciona una categoría</option>
                                            {categorias.map(categoria => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </Field>
                                        {errors.categoria_id && touched.categoria_id &&
                                            <div className="error">{errors.categoria_id}</div>}
                                    </div>
                                ) : (
                                    <p>No hay categorías disponibles</p>
                                )
                            }

                            <div className="form-group-producto">
                                <label>Marca:</label>
                                <Field type="text" name="marca" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.marca}/>
                                {errors.marca && touched.marca && <div className="error">{errors.marca}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Modelo:</label>
                                <Field type="text" name="modelo" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.modelo}/>
                                {errors.modelo && touched.modelo && <div className="error">{errors.modelo}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>FPS:</label>
                                <Field type="text" name="fps" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.fps}/>
                                {errors.fps && touched.fps && <div className="error">{errors.fps}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Calibre:</label>
                                <Field type="text" name="calibre" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.calibre}/>
                                {errors.calibre && touched.calibre && <div className="error">{errors.calibre}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Capacidad del Cargador:</label>
                                <Field type="text" name="capacidad_cargador" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.capacidad_cargador}/>
                                {errors.capacidad_cargador && touched.capacidad_cargador &&
                                    <div className="error">{errors.capacidad_cargador}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Peso:</label>
                                <Field type="text" name="peso" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.peso}/>
                                {errors.peso && touched.peso && <div className="error">{errors.peso}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Imágenes (sube una o más):</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files)
                                        const nuevasPreviews = files.map(file => ({
                                            id: `nuevo-${file.name}-${file.lastModified}`,
                                            src: URL.createObjectURL(file),
                                            file,
                                        }))
                                        setImagenesNuevas(prev => [...prev, ...nuevasPreviews])
                                        setFieldValue("imagenes", [...imagenesNuevas.map(img => img.file), ...files])
                                    }}
                                />
                                {errors.imagenes && touched.imagenes && <div className="error">{errors.imagenes}</div>}
                            </div>

                            {previewImages.length > 0 && (
                                <div className="preview-imagenes">
                                    {previewImages.map(({ id, src }) => (
                                        <img key={id} src={src} alt="Vista previa" className="preview-img" />
                                    ))}
                                </div>
                            )}

                            <div className="form-group-producto">
                                <label>Video de Demostración (URL):</label>
                                <Field type="text" name="video_demo" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.video_demo}/>
                                {errors.video_demo && touched.video_demo &&
                                    <div className="error">{errors.video_demo}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Tiempo de Envío:</label>
                                <Field type="text" name="tiempo_envio" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.tiempo_envio}/>
                                {errors.tiempo_envio && touched.tiempo_envio &&
                                    <div className="error">{errors.tiempo_envio}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Estado Activo:</label>
                                <Field as="select" name="estado_activo" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.estado_activo}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </Field>
                                {errors.estado_activo && touched.estado_activo &&
                                    <div className="error">{errors.estado_activo}</div>}
                            </div>

                            <div className="modal-acciones">
                                <button type="submit" disabled={isSubmitting}>
                                    {modo === "crear" ? "Publicar" : "Guardar"}
                                </button>
                                <button type="button" className="cancelar" onClick={onClose} disabled={isSubmitting}>
                                    Cancelar
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default function Productos({productos, categorias}) {

    const access_token = usuarioStore(state => state.access_token)

    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false)
    const [productosAMostrar, setProductosAMostrar] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    useEffect(() => {
        if (productos.length) {
            setProductosAMostrar(productos.slice(0, 6))
        }
    }, [productos])

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
                totalItems={productos.length}
                itemsPerPage={6}
                onPageChange={({start, end}) => {
                    setProductosAMostrar(productos.slice(start, end))
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
                            console.log(productoActualizado)
                            setProductosAMostrar(prev => prev.map(p => p.id === productoSeleccionado.id ? productoActualizado : p))
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
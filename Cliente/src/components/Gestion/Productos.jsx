import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Paginacion from "./Paginacion";
import {Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import ProductosService from "../../services/ProductoService.jsx";
import ProductoService from "../../services/ProductoService.jsx";
import usuarioStore from "../../context/UsuarioStore.jsx";
import {object, string} from "yup";
import "../../css/gestion/producto.css";


/*
{
    "id": 1,
    "nombre": "enim placeat quia",
    "descripcion": "Iste illo nihil excepturi voluptate est velit sit sint iusto rerum.",
    "precio": "201.07",
    "descuento": "6.82",
    "precio_final": 194.25,
    "stock": 78,
    "categoria": {
      "id": 3,
      "nombre": "Munición"
    },
    "marca": "Laureano de Monroy y Flia.",
    "modelo": "MODEL-20ZI",
    "fps": 151,
    "calibre": "6 mm",
    "capacidad_cargador": 116,
    "peso": 4.74,
    "imagenes": [
      "https://via.placeholder.com/640x480.png/00bb99?text=animi",
      "https://via.placeholder.com/640x480.png/00ccbb?text=ipsam"
    ],
    "video_demo": "http://arenas.es/quos-nisi-sequi-velit-at-quis-quam.html",
    "tiempo_envio": "24h",
    "estado_activo": false,
}
*/

const validationSchema = object({
    nombre: string().required('El nombre es obligatorio'),
    descripcion: string().required('La descripción es obligatoria'),
    precio: string().required('El precio es obligatorio').matches(/^\d+(\.\d{1,2})?$/, 'El precio debe ser un número válido'),
    descuento: string().matches(/^\d+(\.\d{1,2})?$/, 'El descuento debe ser un número válido'),
    precio_final: string().matches(/^\d+(\.\d{1,2})?$/, 'El precio final debe ser un número válido'),
    stock: string().matches(/^\d+$/, 'El stock debe ser un número entero'),
    categoria: string().required('La categoría es obligatoria'),
    marca: string().required('La marca es obligatoria'),
    modelo: string().required('El modelo es obligatorio'),
    fps: string().matches(/^\d+$/, 'Los FPS deben ser un número entero'),
    calibre: string().required('El calibre es obligatorio'),
    capacidad_cargador: string().matches(/^\d+$/, 'La capacidad del cargador debe ser un número entero'),
    peso: string().matches(/^\d+(\.\d{1,2})?$/, 'El peso debe ser un número válido'),
    imagenes: string().matches(/^(https?:\/\/[^\s]+(,[^\s]+)*)?$/, 'Las imágenes deben ser URLs válidas separadas por comas'),
    video_demo: string().matches(/^(https?:\/\/[^\s]+)?$/, 'El video de demostración debe ser una URL válida'),
    tiempo_envio: string().required('El tiempo de envío es obligatorio'),
    estado_activo: string().oneOf(['true', 'false'], 'El estado activo debe ser verdadero o falso'),
})

function ModalProducto({producto = null, onClose, onSave, modo = "editar"}) {

    const valoresIniciales = {
        nombre: producto?.nombre || "PRODUCTO DE PRUEBA",
        descripcion: producto?.descripcion || "DESCRIPCION DE PRUEBA",
        precio: producto?.precio || 1,
        descuento: producto?.descuento || 0,
        precio_final: producto?.precio_final || 1,
        stock: producto?.stock || 0,
        categoria: producto?.categoria?.id || 1,
        marca: producto?.marca || "MARCA DE PRUIEBA",
        modelo: producto?.modelo || "MODELO DE PRUEBA",
        fps: producto?.fps || 0,
        calibre: producto?.calibre || "12",
        capacidad_cargador: producto?.capacidad_cargador || 0,
        peso: producto?.peso || 0,
        imagenes: (producto?.imagenes || []).join(', '),
        video_demo: producto?.video_demo || "",
        tiempo_envio: producto?.tiempo_envio || "24h",
        estado_activo: producto?.estado_activo || false,
    };

    const handleSubmit = (valores) => {
        const imagenesProcesadas = valores.imagenes
            .split(',')
            .map(url => url.trim())
            .filter(Boolean);

        // Asegurarse de que el estado_activo sea un booleano
        valores.estado_activo = valores.estado_activo === 'true';

        const productoResultado = {
            ...producto,
            ...valores,
            imagenes: imagenesProcesadas,
        };

        onSave(productoResultado);
        onClose();
    };

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
                    {({handleChange, handleBlur, values, errors, touched, isSubmitting}) => (
                        <Form>
                            <div className="form-group-producto">
                                <label>Nombre:</label>
                                <Field type="text" name="nombre" className="form-field"
                                       onChange={handleChange}
                                       onBlur={handleBlur} value={values.nombre} />
                                {errors.nombre && touched.nombre && <div className="error">{errors.nombre}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Descripción:</label>
                                <Field as="textarea" name="descripcion" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.descripcion} />
                                {errors.descripcion && touched.descripcion && <div className="error">{errors.descripcion}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Precio:</label>
                                <Field type="text" name="precio" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.precio} />
                                {errors.precio && touched.precio && <div className="error">{errors.precio}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Descuento:</label>
                                <Field type="text" name="descuento" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.descuento} />
                                {errors.descuento && touched.descuento && <div className="error">{errors.descuento}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Precio Final:</label>
                                <Field type="text" name="precio_final" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.precio_final} />
                                {errors.precio_final && touched.precio_final && <div className="error">{errors.precio_final}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Stock:</label>
                                <Field type="text" name="stock" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.stock} />
                                {errors.stock && touched.stock && <div className="error">{errors.stock}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Categoría:</label>
                                <Field as="select" name="categoria" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.categoria}>
                                    <option value="">Selecciona una categoría</option>
                                    <option value="1">Munición</option>
                                    <option value="2">Accesorios</option>
                                    <option value="3">Armas</option>
                                    <option value="4">Ropa</option>
                                    <option value="5">Equipamiento</option>
                                    <option value="6">Otros</option>
                                </Field>
                                {errors.categoria && touched.categoria && <div className="error">{errors.categoria}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Marca:</label>
                                <Field type="text" name="marca" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.marca} />
                                {errors.marca && touched.marca && <div className="error">{errors.marca}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Modelo:</label>
                                <Field type="text" name="modelo" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.modelo} />
                                {errors.modelo && touched.modelo && <div className="error">{errors.modelo}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>FPS:</label>
                                <Field type="text" name="fps" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.fps} />
                                {errors.fps && touched.fps && <div className="error">{errors.fps}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Calibre:</label>
                                <Field type="text" name="calibre" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.calibre} />
                                {errors.calibre && touched.calibre && <div className="error">{errors.calibre}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Capacidad del Cargador:</label>
                                <Field type="text" name="capacidad_cargador" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.capacidad_cargador} />
                                {errors.capacidad_cargador && touched.capacidad_cargador && <div className="error">{errors.capacidad_cargador}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Peso:</label>
                                <Field type="text" name="peso" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.peso} />
                                {errors.peso && touched.peso && <div className="error">{errors.peso}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Imágenes (URLs separadas por comas):</label>
                                <Field type="text" name="imagenes" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.imagenes} />
                                {errors.imagenes && touched.imagenes && <div className="error">{errors.imagenes}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Video de Demostración (URL):</label>
                                <Field type="text" name="video_demo" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.video_demo} />
                                {errors.video_demo && touched.video_demo && <div className="error">{errors.video_demo}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Tiempo de Envío:</label>
                                <Field type="text" name="tiempo_envio" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.tiempo_envio} />
                                {errors.tiempo_envio && touched.tiempo_envio && <div className="error">{errors.tiempo_envio}</div>}
                            </div>

                            <div className="form-group-producto">
                                <label>Estado Activo:</label>
                                <Field as="select" name="estado_activo" className="form-field"
                                        onChange={handleChange}
                                        onBlur={handleBlur} value={values.estado_activo}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </Field>
                                {errors.estado_activo && touched.estado_activo && <div className="error">{errors.estado_activo}</div>}
                            </div>

                            {/*}
                            <div className="modal-acciones">
                                <button type="submit">
                                    {modo === "crear" ? "Publicar" : "Guardar"}
                                </button>
                                <button type="button" className="cancelar" onClick={onClose}>
                                    Cancelar
                                </button>
                            </div>
                            */}

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
    );
}

export default function Productos({productos}) {

    const access_token = usuarioStore(state => state.access_token)

    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
    const [productosAMostrar, setProductosAMostrar] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        if (productos.length) {
            setProductosAMostrar(productos.slice(0, 6));
        }
    }, [productos]);

    const editarProducto = (producto) => {
        setProductoSeleccionado(producto);
    };

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
                            );
                            setProductosAMostrar(prev => prev.filter(p => p.id !== id));
                        }
                    ).catch(error => {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el producto: ' + error.message,
                            'error'
                        );
                    });
                }
            }
        )
    };

    const guardarCambios = (productoActualizado) => {
        Swal.fire(
            {
                title: '¿Estás seguro?',
                text: "¡Los cambios se guardarán!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, guardar'
            }
        ).then((result) => {
                if (result.isConfirmed) {
                    // Aquí podrías hacer una petición al backend para actualizar el producto
                    ProductosService.updateProducto({
                        params: {
                            id: productoActualizado.id,
                            access_token, ...productoActualizado
                        }
                    })
                        .then(() => {
                            Swal.fire(
                                '¡Guardado!',
                                'El producto ha sido actualizado.',
                                'success'
                            );
                            setProductosAMostrar(prev => prev.map(p => p.id === productoActualizado.id ? productoActualizado : p));
                            setProductoSeleccionado(null);
                        })
                        .catch(error => {
                            Swal.fire(
                                'Error',
                                'No se pudo actualizar el producto: ' + error.message,
                                'error'
                            );
                        });
                }
            }
        )
    };

    return (
        <div className="producto-card-contenedor">

            <button onClick={() => setMostrarModalNuevo(true)} className="boton-nuevo-producto">
                + Nuevo Producto
            </button>

            <div className="grid-container">
                {productosAMostrar.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <Link to={`/tienda/${producto.id}`}>
                            <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre}/>
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
                    setProductosAMostrar(productos.slice(start, end));
                }}
            />

            {mostrarModalNuevo && (
                <ModalProducto
                    modo="crear"
                    onClose={() => setMostrarModalNuevo(false)}
                    onSave={(productoNuevo) => {
                        ProductosService.postProducto({
                            params: {access_token, ...productoNuevo}
                        }).then(({data}) => {
                            Swal.fire("¡Creado!", "El producto fue publicado.", "success");
                            setProductosAMostrar(prev => [data, ...prev]);
                            setMostrarModalNuevo(false);
                        }).catch(error => {
                            Swal.fire("Error", "No se pudo crear: " + error.message, "error");
                        });
                    }}
                />
            )}

            {productoSeleccionado && (
                <ModalProducto
                    modo="editar"
                    producto={productoSeleccionado}
                    onClose={() => setProductoSeleccionado(null)}
                    onSave={guardarCambios}
                />
            )}

        </div>
    );
}
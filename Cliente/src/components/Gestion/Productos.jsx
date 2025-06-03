import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Paginacion from "./Paginacion";
import {Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import ProductosService from "../../services/ProductoService.jsx";
import ProductoService from "../../services/ProductoService.jsx";
import usuarioStore from "../../context/UsuarioStore.jsx";
import {string} from "yup";

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

const validationSchema = {
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
}

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
                    validate={values => {
                        const errors = {};
                        Object.keys(validationSchema).forEach(key => {
                            const error = validationSchema[key].validate(values[key]);
                            if (error instanceof Error) {
                                errors[key] = error.message;
                            }
                        });
                        return errors;
                    }}
                >
                    {({values}) => (

                        <Form>
                            <label>
                                Nombre:
                                <Field type="text" name="nombre" className="form-field"/>
                            </label>

                            <label>
                                Descripción:
                                <Field as="textarea" name="descripcion" className="form-field"
                                />
                            </label>

                            <label>
                                Precio:
                                <Field type="number" name="precio" className="form-field" step="0.01"/>
                            </label>

                            <label>
                                Descuento:
                                <Field type="number" name="descuento" className="form-field" step="0.01"/>
                            </label>

                            <label>
                                Precio Final:
                                <Field type="number" name="precio_final" className="form-field" step="0.01" readOnly/>
                            </label>

                            <label>
                                Stock:
                                <Field type="number" name="stock" className="form-field" min="0"/>
                            </label>

                            <label>
                                Categoría:
                                <Field as="select" name="categoria" className="form-field"
                                >
                                    <option value="1">Munición</option>
                                    <option value="2">Accesorios</option>
                                    <option value="3">Armas</option>
                                    <option value="4">Ropa</option>
                                    <option value="5">Equipamiento</option>
                                </Field>
                            </label>

                            <label>
                                Marca:
                                <Field type="text" name="marca" className="form-field"/>
                            </label>

                            <label>
                                Modelo:
                                <Field type="text" name="modelo" className="form-field"/>
                            </label>

                            <label>
                                FPS:
                                <Field type="number" name="fps" className="form-field" min="0"/>
                            </label>

                            <label>
                                Calibre:
                                <Field type="text" name="calibre" className="form-field"/>
                            </label>

                            <label>
                                Capacidad del Cargador:
                                <Field type="number" name="capacidad_cargador" className="form-field" min="0"/>
                            </label>

                            <label>
                                Peso:
                                <Field type="number" name="peso" className="form-field" step="0.01" min="0"/>
                            </label>

                            <label>
                                Imágenes (URLs):
                                <Field type="text" name="imagenes" className="form-field"
                                       placeholder="https://ejemplo.com/imagen.jpg"/>
                            </label>

                            <label>
                                Video de Demostración (URL):
                                <Field type="text" name="video_demo" className="form-field"
                                       placeholder="https://ejemplo.com/video.mp4"/>
                            </label>

                            <label>
                                Tiempo de Envío:
                                <Field as="select" name="tiempo_envio" className="form-field">
                                    <option value="24h">24 horas</option>
                                    <option value="48h">48 horas</option>
                                    <option value="72h">72 horas</option>
                                    <option value="1 semana">1 semana</option>
                                    <option value="2 semanas">2 semanas</option>
                                    <option value="1 mes">1 mes</option>
                                </Field>
                            </label>

                            <label className="checkbox">
                                <Field type="checkbox" name="estado_activo" checked={values.estado_activo}/>
                                Activo
                            </label>

                            <div className="modal-acciones">
                                <button type="submit">
                                    {modo === "crear" ? "Publicar" : "Guardar"}
                                </button>
                                <button type="button" className="cancelar" onClick={onClose}>
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
            setProductosAMostrar(productos.slice(0, 8));
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
        <div>

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
                itemsPerPage={8}
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
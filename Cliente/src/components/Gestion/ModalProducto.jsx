import {useEffect, useState} from "react";
import {corregirUrlImagen} from "../../hooks/corregirUrlImagen.jsx";
import {Field, Form, Formik} from "formik";
import {boolean, mixed, object, string} from "yup";

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
    estado_activo: boolean().required('El estado activo es obligatorio').oneOf([true, false], 'El estado activo debe ser verdadero o falso'),
})

/**
 * Componente para crear o editar un producto en la tienda.
 * @description Este componente permite crear o editar un producto, incluyendo su información, imágenes y estado.
 * @param {Object} producto - Objeto del producto a editar, si es null se crea uno nuevo.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {function} onSave - Función para guardar el producto.
 * @param {string} modo - Modo de operación, "crear" o "editar".
 * @param {Array} categorias - Lista de categorías disponibles para el producto.
 */
export function ModalProducto({producto = null, onClose, onSave, modo = "editar", categorias}) {

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
        precio: parseFloat(producto?.precio || 0).toFixed(2),
        descuento: parseFloat(producto?.descuento || 0).toFixed(2),
        precio_final: parseFloat(producto?.precio_final || 0).toFixed(2),
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

        for (const clave in valores) {
            if (clave !== "imagenes" && clave !== "estado_activo") {
                formData.append(clave, valores[clave])
            }
        }

        formData.append('estado_activo', valores.estado_activo === "true" ? 1 : 0)

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
                                    {previewImages.map(({id, src}) => (
                                        <img key={id} src={src} alt="Vista previa" className="preview-img"/>
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
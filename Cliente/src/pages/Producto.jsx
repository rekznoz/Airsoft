import {useLoaderData} from "react-router-dom"
import "../css/producto.css"
import {useState} from "react"

import ProductoDetalles from '../components/Producto/ProductoDetalles'
import GaleriaImagenes from '../components/Producto/GaleriaImagenes'
import ModalImagen from '../components/Producto/ModalImagen'
import ComentariosPaginados from '../components/Producto/ComentariosPaginados'
import {corregirUrlImagen} from "../hooks/corregirUrlImagen.jsx"

/**
 * Componente para mostrar los detalles de un producto específico.
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente carga los datos de un producto y muestra su información, imágenes, detalles, comentarios y un vídeo demostración si está disponible.
 */
export default function Producto() {

    const producto = useLoaderData()

    const [imagenGrande, setImagenGrande] = useState(null)
    const cerrarModal = () => setImagenGrande(null)

    return (
        <div className="producto-container">

            <div className="producto-breadcrumb">
                <h1>{producto.nombre}</h1>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <p className="producto-precio">{producto.precio_final.toLocaleString()}€</p>
                <>
                    {producto.descuento > 0 && (
                        <p className="producto-descuento">
                            <span className="descuento-porcentaje">{producto.descuento}%</span>
                            <span className="descuento-precio">
                                {producto.precio.toLocaleString()}€
                            </span>
                        </p>
                    )}
                </>
                {producto.imagenes.length > 0 ?
                    <img src={corregirUrlImagen(producto.imagenes[0])}
                            className="producto-imagen-principal"
                            alt={producto.nombre}
                            onClick={() => setImagenGrande(corregirUrlImagen(producto.imagenes[0]))}/>
                    :
                    <p className="producto-sin-imagen">No hay imagen disponible</p>
                }
            </div>

            <ProductoDetalles producto={producto}/>

            {producto.imagenes.length > 0 && (
                <GaleriaImagenes imagenes={producto.imagenes} setImagenGrande={setImagenGrande}/>
            )}

            {imagenGrande && (
                <ModalImagen imagenUrl={imagenGrande} onClose={cerrarModal}/>
            )}

            {producto.video_demo && (
                <section className="producto-video">
                    <h2>Vídeo demostración</h2>
                    <a href={producto.video_demo} target="_blank" rel="noopener noreferrer">
                        Ver vídeo
                    </a>
                </section>
            )}

            <ComentariosPaginados comentarios={producto.array_comentarios} producto={producto}/>

        </div>
    )
}

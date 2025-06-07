import {useLoaderData} from "react-router-dom"
import "../css/producto.css"
import {useState} from "react"

import ProductoDetalles from '../components/Producto/ProductoDetalles'
import GaleriaImagenes from '../components/Producto/GaleriaImagenes'
import ModalImagen from '../components/Producto/ModalImagen'
import ComentariosPaginados from '../components/Producto/ComentariosPaginados'
import {corregirUrlImagen} from "../hooks/corregirUrlImagen.jsx"

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
                <img src={corregirUrlImagen(producto.imagenes[0])}
                     className="producto-imagen-principal"
                     onClick={() => setImagenGrande(corregirUrlImagen(producto.imagenes[0]))}/>
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

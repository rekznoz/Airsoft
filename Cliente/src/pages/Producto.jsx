import {useLoaderData} from "react-router-dom"
import "../css/producto.css"
import {useState} from "react"

import ProductoDetalles from '../components/Producto/ProductoDetalles'
import GaleriaImagenes from '../components/Producto/GaleriaImagenes'
import ModalImagen from '../components/Producto/ModalImagen'
import ComentariosPaginados from '../components/Producto/ComentariosPaginados'

export default function Producto() {

    const producto = useLoaderData()

    const [imagenGrande, setImagenGrande] = useState(null)
    const cerrarModal = () => setImagenGrande(null)

    return (
        <div className="producto-container">

            <div className="producto-breadcrumb">
                <h1>{producto.nombre}</h1>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre}
                     className="producto-imagen-principal"
                     onClick={() => setImagenGrande("https://i.imgur.com/yMVfJZD.jpeg")}/>
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

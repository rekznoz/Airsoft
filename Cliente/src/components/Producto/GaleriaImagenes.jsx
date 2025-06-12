import {corregirUrlImagen} from "../../hooks/corregirUrlImagen.jsx"

/**
 * Componente para mostrar una galería de imágenes de un producto.
 * @param imagenes
 * @param setImagenGrande
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra una galería de imágenes del producto y permite seleccionar una imagen para verla en grande.
 * @param {Array} imagenes - Lista de URLs de las imágenes del producto.
 * @param {function} setImagenGrande - Función para establecer la imagen grande seleccionada.
 */
export default function GaleriaImagenes({imagenes, setImagenGrande}) {
    return (
        <section className="producto-imagenes">
            <h2>Imágenes</h2>
            <div className="galeria-imagenes">
                {imagenes.map((url, idx) => (
                    <img
                        key={idx}
                        src={corregirUrlImagen(url)}
                        alt={`Producto imagen ${idx + 1}`}
                        onClick={() => setImagenGrande(corregirUrlImagen(url))}
                    />
                ))}
            </div>
        </section>
    )
}

import {corregirUrlImagen} from "../../hooks/corregirUrlImagen.jsx"

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

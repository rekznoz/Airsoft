export default function GaleriaImagenes({imagenes, setImagenGrande}) {
    return (
        <section className="producto-imagenes">
            <h2>Imágenes</h2>
            <div className="galeria-imagenes">
                {imagenes.map((url, idx) => (
                    <img
                        key={idx}
                        src="https://i.imgur.com/yMVfJZD.jpeg"
                        alt={`Producto imagen ${idx + 1}`}
                        onClick={() => setImagenGrande("https://i.imgur.com/yMVfJZD.jpeg")}
                    />
                ))}
            </div>
        </section>
    );
}

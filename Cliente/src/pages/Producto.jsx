import {useLoaderData} from "react-router-dom";
import "../css/producto.css"
import {useState} from "react";

export default function Producto() {

    const producto = useLoaderData();

    const [imagenGrande, setImagenGrande] = useState(null);
    const cerrarModal = () => setImagenGrande(null);

    /* Paginacion */

    // dentro del componente Producto
    const [paginaComentarios, setPaginaComentarios] = useState(1);
    const comentariosPorPagina = 4;

    const totalComentarios = producto.array_comentarios.length;
    const totalPaginas = Math.ceil(totalComentarios / comentariosPorPagina);

    const comentariosPaginados = producto.array_comentarios.slice(
        (paginaComentarios - 1) * comentariosPorPagina,
        paginaComentarios * comentariosPorPagina
    );

    const siguientePagina = () => {
        if (paginaComentarios < totalPaginas) setPaginaComentarios(p => p + 1);
    };

    const anteriorPagina = () => {
        if (paginaComentarios > 1) setPaginaComentarios(p => p - 1);
    };

    return (
        <div className="producto-container">
            <div className="producto-breadcrumb">
                <h1>{producto.nombre}</h1>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre}
                     className="producto-imagen-principal"
                     onClick={() => setImagenGrande("https://i.imgur.com/yMVfJZD.jpeg")}/>
            </div>
            <div className="contenedor-producto-detalles">
                <section className="producto-detalles">
                    <h2>Detalles</h2>
                    <ul>
                        <li><strong>Precio base:</strong> {producto.precio} €</li>
                        <li><strong>Descuento:</strong> {producto.descuento} €</li>
                        <li><strong>Precio final:</strong> {producto.precio_final} €</li>
                        <li><strong>Stock:</strong> {producto.stock > 0 ? `${producto.stock} unidades` : "Agotado"}</li>
                        <li><strong>Tiempo de envío:</strong> {producto.tiempo_envio}</li>
                        <li><strong>Estado:</strong> {producto.estado_activo ? "Activo" : "Inactivo"}</li>
                    </ul>
                </section>
                <section className="producto-detalles">
                    <h2>Especificaciones</h2>
                    <ul>
                        <li><strong>Marca:</strong> {producto.marca}</li>
                        <li><strong>Modelo:</strong> {producto.modelo}</li>
                        <li><strong>Categoría:</strong> {producto.categoria?.nombre}</li>
                        <li><strong>FPS:</strong> {producto.fps}</li>
                        <li><strong>Calibre:</strong> {producto.calibre}</li>
                        <li><strong>Capacidad del cargador:</strong> {producto.capacidad_cargador}</li>
                        <li><strong>Peso:</strong> {producto.peso} kg</li>
                    </ul>
                </section>
            </div>

            {producto.imagenes.length > 0 && (
                <section className="producto-imagenes">
                    <h2>Imágenes</h2>
                    <div className="galeria-imagenes">
                        {producto.imagenes.map((url, idx) => (
                            <img
                                key={idx}
                                src="https://i.imgur.com/yMVfJZD.jpeg"
                                alt={`Producto imagen ${idx + 1}`}
                                onClick={() => setImagenGrande("https://i.imgur.com/yMVfJZD.jpeg")}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Modal de imagen ampliada */}
            {imagenGrande && (
                <div className="modal-imagen" onClick={cerrarModal}>
                    <img src={imagenGrande} alt="Imagen ampliada"/>
                    <span className="cerrar-modal">&times;</span>
                </div>
            )}

            {producto.video_demo && (
                <section className="producto-video">
                    <h2>Vídeo demostración</h2>
                    <a href={producto.video_demo} target="_blank" rel="noopener noreferrer">
                        Ver vídeo
                    </a>
                </section>
            )}

            {producto.array_comentarios.length > 0 && (
                <section className="producto-comentarios">
                    <h2>Comentarios ({totalComentarios})</h2>
                    <ul style={{listStyle: "none", padding: 0}}>
                        {comentariosPaginados.map(comentario => (
                            <li key={comentario.id} style={{borderBottom: "1px solid #ddd", padding: "1rem 0"}}>
                                <p><strong>{comentario.user.name}</strong> <em>({comentario.calificacion}/10)</em></p>
                                <p>{comentario.comentario}</p>
                                <p style={{fontSize: "0.8rem", color: "#999"}}>
                                    {new Date(comentario.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Navegación de paginación */}
                    {producto.array_comentarios.length > comentariosPorPagina && (
                        <div className="paginacion-comentarios">
                            <button onClick={anteriorPagina} disabled={paginaComentarios === 1}>Anterior</button>
                            <span>Página {paginaComentarios} de {totalPaginas}</span>
                            <button onClick={siguientePagina} disabled={paginaComentarios === totalPaginas}>Siguiente
                            </button>
                        </div>
                    )}
                </section>
            )}

        </div>
    );
}

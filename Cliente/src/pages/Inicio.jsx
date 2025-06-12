import "../css/inicio.css"
import ProductoService from "../services/ProductoService.jsx"
import ComentariosService from "../services/ComentariosService.jsx"
import {Link} from "react-router-dom"
import {corregirUrlImagen} from "../hooks/corregirUrlImagen.jsx"
import {useEffect, useState} from "react"

const features = [
    { icon: "🎯", title: "Alta precisión", desc: "Réplicas de calidad para una experiencia realista." },
    { icon: "🛡️", title: "Equipamiento táctico", desc: "Protección y estilo en todos tus combates." },
    { icon: "🚚", title: "Envío rápido", desc: "Enviamos a toda España en 24/48h." }
]

export default function Inicio() {

    const [productos, setProductos] = useState([])
    const [comentarios, setComentarios] = useState([])

    // Cargar productos y comentarios al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const productosData = await ProductoService.getProductos()
                const comentariosData = await ComentariosService.getComentariosVerificados()

                const productosAleatorios = productosData.sort(() => Math.random() - 0.5)
                const comentariosAleatorios = comentariosData.sort(() => Math.random() - 0.5)

                setProductos(productosAleatorios)
                setComentarios(comentariosAleatorios)
            } catch (error) {
                console.error("Error al cargar los datos:", error)
            }
        }
        cargarDatos()
    },[])


    return (
        <div className="contenedor">

            <section className="hero">
                <div className="hero-content">
                    <h1>Bienvenido a Airsoft Zone</h1>
                    <p>Equipamiento táctico, réplicas realistas y adrenalina en estado puro.</p>
                    <Link to="/tienda" className="btn-hero">Explorar productos</Link>
                </div>
            </section>

            <section className="gallery">
                <h2>Algunos Productos</h2>
                <ul className="gallery-grid">
                    {
                        productos.length > 0 ? (
                            productos.slice(0,4).map((producto) => (
                                <li key={producto.id} className="gallery-item">
                                    <Link to={`/tienda/${producto.id}`}>
                                        <img
                                            src={producto.imagenes?.[0] ? corregirUrlImagen(producto.imagenes[0]) : '/img/default.jpg'}
                                            alt={`Imagen del producto ${producto.nombre}`}
                                        />
                                        <h3>{producto.nombre}</h3>
                                        <p>{producto.descripcion}</p>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p className="gallery-empty">No hay productos disponibles.</p>
                        )
                    }
                </ul>
            </section>

            <section className="features">
                <h2>¿Por qué elegirnos?</h2>
                <div className="features-list">
                    {features.map((f, i) => (
                        <div key={i} className="feature">
                            <span className="icon">{f.icon}</span>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="testimonials">
                <h2>Lo que opinan nuestros clientes</h2>
                <div className="testimonial-list">
                    {
                        comentarios.length > 0 ? (
                            comentarios.slice(0,6).map((comentario) => (
                                <div key={comentario.id} className="testimonial">
                                    <p>"{comentario.comentario}"</p>
                                    <span>- {comentario.nombre}</span>
                                </div>
                            ))
                        ) : (
                            <p className="testimonial-empty">No hay comentarios disponibles.</p>
                        )
                    }
                </div>
            </section>

            <section className="cta">
                <h2>¿Listo para entrar en combate?</h2>
                <p>Explora nuestras réplicas y equípate como un profesional del airsoft.</p>
                <Link to="/tienda" className="btn-cta">Ver catálogo</Link>
            </section>

        </div>
    )
}
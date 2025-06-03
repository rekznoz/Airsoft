// src/pages/Gestion.jsx
import {useLoaderData} from "react-router-dom"
import { useState } from "react"
import Productos from "../components/Gestion/Productos.jsx"
import "../css/gestion.css"

const SECCIONES = {
    productos: "Productos",
    pedidos: "Pedidos",
    comentarios: "Comentarios",
    categorias: "Categorías",
}

export default function Gestion() {
    const {productos, pedidos, comentarios, categorias} = useLoaderData()
    const [seccionActiva, setSeccionActiva] = useState("productos")

    const renderSeccion = () => {
        switch (seccionActiva) {
            case "productos":
                return <Productos productos={productos} />
            case "pedidos":
                return <p>Aquí se mostrarán los pedidos. (Funcionalidad pendiente)</p>
            case "comentarios":
                return <p>Aquí se mostrarán los comentarios. (Funcionalidad pendiente)</p>
            case "categorias":
                return <p>Aquí se mostrarán las categorías. (Funcionalidad pendiente)</p>
            default:
                return null
        }
    }

    return (
        <div className="gestion-contenedor">
            <nav className="gestion-nav">
                {Object.entries(SECCIONES).map(([key, label]) => (
                    <button
                        key={key}
                        className={`nav-btn ${seccionActiva === key ? "activo" : ""}`}
                        onClick={() => setSeccionActiva(key)}
                    >
                        {label}
                    </button>
                ))}
            </nav>
            <div className="gestion-seccion">
                {renderSeccion()}
            </div>
        </div>
    )
}

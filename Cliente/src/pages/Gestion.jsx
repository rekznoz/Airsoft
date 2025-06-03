// src/pages/Gestion.jsx
import {useLoaderData} from "react-router-dom"
import { useState } from "react"

import Productos from "../components/Gestion/Productos.jsx"
import Pedidos from "../components/Gestion/Pedidos.jsx"
import Comentarios from "../components/Gestion/Comentarios.jsx"
import Categorias from "../components/Gestion/Categorias.jsx"

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
                return <Pedidos pedidos={pedidos} />
            case "comentarios":
                return <Comentarios comentarios={comentarios} />
            case "categorias":
                return <Categorias categorias={categorias} />
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

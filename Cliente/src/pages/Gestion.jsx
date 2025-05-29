import {useLoaderData} from "react-router-dom";
import Productos from "../components/Gestion/Productos.jsx";
import "../css/gestion.css"

export default function Gestion() {

    const {productos, pedidos, comentarios, categorias} = useLoaderData();

    return (
        <div className="gestion-contenedor">
            <h2>Gestión de Productos</h2>
            <Productos productos={productos} />
        </div>
    )
}
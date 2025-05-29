import {useLoaderData} from "react-router-dom";

export default function Gestion() {

    const {productos, pedidos, comentarios, categorias} = useLoaderData();

    console.log(productos)
    console.log(pedidos)
    console.log(comentarios)
    console.log(categorias)

    return (
        <div className="gestion-contenedor">
            <h2>Gestión de Productos</h2>
        </div>
    )
}
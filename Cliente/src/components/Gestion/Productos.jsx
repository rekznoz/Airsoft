import { useState } from "react";
import { Link } from "react-router-dom";
import Paginacion from "./Paginacion";

export default function Productos({ productos }) {
    const [productosAMostrar, setProductosAMostrar] = useState([]);

    const editarProducto = (producto) => {
        console.log("Editar producto:", producto);
    };

    const eliminarProducto = (id) => {
        if (window.confirm("¿Eliminar este producto?")) {
            const nuevaLista = productos.filter(p => p.id !== id);
            // Podrías actualizar productos aquí si viniera del padre
            alert("Simulación: producto eliminado");
        }
    };

    return (
        <div>
            <div className="grid-container">
                {productosAMostrar.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <Link to={`/tienda/${producto.id}`}>
                            <img src={"https://i.imgur.com/yMVfJZD.jpeg"} alt={producto.nombre} />
                        </Link>
                        <h3>{producto.nombre}</h3>
                        <p><strong>Stock:</strong> {producto.stock}</p>
                        <p className={producto.estado_activo ? "activo" : "inactivo"}>
                            {producto.estado_activo ? "Activo" : "Inactivo"}
                        </p>
                        <div className="acciones">
                            <button onClick={() => editarProducto(producto)}>Editar</button>
                            <button onClick={() => eliminarProducto(producto.id)} className="eliminar">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            <Paginacion
                totalItems={productos.length}
                itemsPerPage={8}
                onPageChange={({ start, end }) => {
                    setProductosAMostrar(productos.slice(start, end));
                }}
            />
        </div>
    );
}

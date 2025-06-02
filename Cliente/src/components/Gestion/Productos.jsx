import { useState } from "react";
import { Link } from "react-router-dom";
import Paginacion from "./Paginacion";

export default function Productos({ productos }) {
    const [productosAMostrar, setProductosAMostrar] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [formulario, setFormulario] = useState({
        nombre: "",
        stock: 0,
        estado_activo: true,
    });

    const editarProducto = (producto) => {
        setProductoSeleccionado(producto);
        setFormulario({
            nombre: producto.nombre,
            stock: producto.stock,
            estado_activo: producto.estado_activo,
        });
    };

    const cerrarModal = () => {
        setProductoSeleccionado(null);
    };

    const guardarCambios = () => {
        // Aquí deberías enviar los datos al backend o actualizar el estado padre
        console.log("Producto actualizado:", {
            ...productoSeleccionado,
            ...formulario,
        });
        alert("Simulación: producto actualizado");
        cerrarModal();
    };

    const eliminarProducto = (id) => {
        if (window.confirm("¿Eliminar este producto?")) {
            const nuevaLista = productos.filter(p => p.id !== id);
            alert("Simulación: producto eliminado");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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

            {productoSeleccionado && (
                <div className="modal-fondo">
                    <div className="modal">
                        <h2>Editar Producto</h2>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Stock:
                            <input
                                type="number"
                                name="stock"
                                value={formulario.stock}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="estado_activo"
                                checked={formulario.estado_activo}
                                onChange={handleChange}
                            />
                            Activo
                        </label>
                        <div className="modal-acciones">
                            <button onClick={guardarCambios}>Guardar</button>
                            <button onClick={cerrarModal} className="cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

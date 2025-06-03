/*
{
    "id": 1,
    "user": {
      "id": 2,
      "nombre": "D. Gerard Solorzano"
    },
    "producto": {
      "id": 12,
      "nombre": "error atque fugiat"
    },
    "direccion_envio": "Ruela Giménez, 311, 23º F, 07987, Ruíz de San Pedro",
    "cantidad": 2,
    "estado": "cancelado",
    "created_at": "2025-05-23T14:25:57.000000Z",
    "updated_at": "2025-05-23T14:25:57.000000Z"
}
*/

import { useState } from "react";
import Paginacion from "./Paginacion";
import "../../css/gestion/pedidos.css"

export default function Pedidos({ pedidos, onUpdatePedido }) {
    const [paginatedPedidos, setPaginatedPedidos] = useState([]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    const handlePageChange = ({ start, end }) => {
        setPaginatedPedidos(pedidos.slice(start, end));
    };

    const abrirModal = (pedido) => {
        setPedidoSeleccionado({ ...pedido }); // Copia del pedido
    };

    const cerrarModal = () => {
        setPedidoSeleccionado(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPedidoSeleccionado((prev) => ({
            ...prev,
            [name]: name === "cantidad" ? parseInt(value) : value,
        }));
    };

    const guardarCambios = () => {
        if (onUpdatePedido) {
            onUpdatePedido(pedidoSeleccionado);
        }
        cerrarModal();
    };

    return (
        <div className="pedidos-contenedor">
            <h1>Pedidos</h1>

            {pedidos?.length === 0 ? (
                <p>No hay pedidos aún.</p>
            ) : (
                <>
                    <div className="grid-container">
                        {paginatedPedidos.map((pedido) => (
                            <div key={pedido.id} className={`pedido-card ${pedido.estado}`}>
                                <h3>Pedido #{pedido.id}</h3>
                                <p><strong>Cliente:</strong> {pedido.user?.nombre}</p>
                                <p><strong>Producto:</strong> {pedido.producto?.nombre}</p>
                                <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
                                <p><strong>Estado:</strong>
                                    <span className={`estado-pedidos ${pedido.estado}`}> {pedido.estado}</span>
                                </p>
                                <p><strong>Dirección:</strong> {pedido.direccion_envio}</p>
                                <p><strong>Fecha:</strong> {new Date(pedido.created_at).toLocaleDateString()}</p>

                                <div className="acciones">
                                    <button onClick={() => abrirModal(pedido)}>Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Paginacion
                        totalItems={pedidos.length}
                        itemsPerPage={10}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            {pedidoSeleccionado && (
                <div className="modal-fondo-pedidos" onClick={cerrarModal}>
                    <div className="modal-pedidos" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Pedido #{pedidoSeleccionado.id}</h2>

                        <div className="form-group-pedidos">
                            <label>Dirección de envío:</label>
                            <input
                                type="text"
                                className="form-field-pedidos"
                                name="direccion_envio"
                                value={pedidoSeleccionado.direccion_envio}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group-pedidos">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                className="form-field-pedidos"
                                name="cantidad"
                                value={pedidoSeleccionado.cantidad}
                                min={1}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group-pedidos">
                            <label>Estado:</label>
                            <select
                                className="form-field-pedidos"
                                name="estado"
                                value={pedidoSeleccionado.estado}
                                onChange={handleInputChange}
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="procesando">Procesando</option>
                                <option value="enviado">Enviado</option>
                                <option value="entregado">Entregado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>

                        <div className="modal-acciones-pedidos">
                            <button type="submit" onClick={guardarCambios}>Guardar</button>
                            <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

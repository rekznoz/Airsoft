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

import {useEffect, useState} from "react";
import Paginacion from "./Paginacion";
import "../../css/gestion/pedidos.css"
import {Link} from "react-router-dom";
import PedidosService from "../../services/PedidosService.jsx";
import usuarioStore from "../../context/UsuarioStore.jsx";
import Swal from "sweetalert2";

export default function Pedidos({pedidos: pedidosIniciales}) {

    const [pedidos, setPedidos] = useState(pedidosIniciales || []);
    const [paginatedPedidos, setPaginatedPedidos] = useState([]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const access_token = usuarioStore(state => state.access_token)

    useEffect(() => {
        setPedidos(pedidosIniciales);
    }, [pedidosIniciales]);

    useEffect(() => {
        if (pedidoSeleccionado) {
            setTimeout(() => {
                document.querySelector(".modal input")?.focus();
            }, 100);
        }
    }, [pedidoSeleccionado]);


    const handlePageChange = ({start, end}) => {
        setPaginatedPedidos(pedidos.slice(start, end));
    };

    const abrirModal = (pedido) => {
        setPedidoSeleccionado({...pedido});
    };

    const cerrarModal = () => {
        setPedidoSeleccionado(null);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPedidoSeleccionado((prev) => ({
            ...prev,
            [name]: name === "cantidad" ? parseInt(value) : value,
        }));
    };

    const guardarCambios = () => {
        Swal.fire({
            title: '¿Guardar cambios?',
            text: `¿Desea guardar los cambios en el pedido #${pedidoSeleccionado.id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await PedidosService.updatePedido({
                        params: {
                            id: pedidoSeleccionado.id,
                            access_token,
                            ...pedidoSeleccionado
                        }
                    });

                    if (response && response.data) {
                        Swal.fire('¡Éxito!', 'Pedido actualizado correctamente.', 'success');
                        setPaginatedPedidos((prev) => prev.map(p => p.id === pedidoSeleccionado.id ? response.data : p));
                        cerrarModal();
                    } else {
                        Swal.fire('Error', 'No se pudo actualizar el pedido.', 'error');
                    }

                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Ocurrió un error al actualizar el pedido.', 'error');
                }
            }
        })
    };

    return (
        <div className="pedidos-contenedor">
            {pedidos?.length === 0 ? (
                <p>No hay pedidos aún.</p>
            ) : (
                <>
                    <div className="grid-container">
                        {paginatedPedidos.map((pedido) => (
                            <div key={pedido.id} className={`pedido-card ${pedido.estado}`}>
                                <h3>
                                    <Link to={`/pedido/${pedido.id}`}>
                                        Pedido #{pedido.id}
                                    </Link>
                                </h3>
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
                <div className="modal-fondo" onClick={cerrarModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Pedido #{pedidoSeleccionado.id}</h2>

                        <div className="form-group-producto">
                            <label>Dirección de envío:</label>
                            <input
                                type="text"
                                className="form-field"
                                name="direccion_envio"
                                value={pedidoSeleccionado.direccion_envio}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group-producto">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                className="form-field"
                                name="cantidad"
                                value={pedidoSeleccionado.cantidad}
                                min={1}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group-producto">
                            <label>Código de envío:</label>
                            <input
                                type="text"
                                className="form-field"
                                name="codigo_envio"
                                value={pedidoSeleccionado.codigo_envio || ''}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group-producto">
                            <label>Estado:</label>
                            <select
                                className="form-field"
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

                        <div className="modal-acciones">
                            <button type="submit" onClick={guardarCambios}>Guardar</button>
                            <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/*

{
  "data": {
    "id": 1,
    "user": {
      "id": 4,
    },
    "producto": {
      "id": 17,
    },
    "direccion_envio": "Praza Dario, 5, 9º 6º, 92023, As Fierro del Puerto",
    "cantidad": 3,
    "estado": "entregado",
    "created_at": "2025-05-19T16:57:56.000000Z",
    "updated_at": "2025-05-19T16:57:56.000000Z"
  }
}

*/

import {useLoaderData} from "react-router-dom";
import "../css/Pedido.css"; // Asegúrate de importar el CSS

export default function Pedido() {
    const pedido = useLoaderData();

    return (
        <div className="pedido-container">
            <h1 className="pedido-titulo">📦 Pedido #{pedido.id}</h1>
            <div className="pedido-detalles">
                <div className="detalle">
                    <span className="etiqueta">🧑 Usuario ID:</span>
                    <span className="valor">{pedido.user.id}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🛒 Producto ID:</span>
                    <span className="valor">{pedido.producto.id}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">📍 Dirección de envío:</span>
                    <span className="valor">{pedido.direccion_envio}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🔢 Cantidad:</span>
                    <span className="valor">{pedido.cantidad}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🚚 Estado:</span>
                    <span className={`valor estado ${pedido.estado}`}>
                        {pedido.estado}
                    </span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">📅 Creado:</span>
                    <span className="valor">{new Date(pedido.created_at).toLocaleString()}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🕒 Actualizado:</span>
                    <span className="valor">{new Date(pedido.updated_at).toLocaleString()}</span>
                </div>
                {/* Codigo de Envio */}
                <div className="detalle">
                    <span className="etiqueta">📦 Código de envío:</span>
                    <span className="valor">
                        {pedido.codigo_envio || "No disponible"}
                    </span>
                </div>
                {/* Enlace a la empresa de envios */}
                <div className="detalle">
                    <span className="etiqueta">🚚 Empresa de envíos:</span>
                    <a href={`https://www.correos.es/es/es/herramientas/localizador/envios`} target="_blank" className="valor">
                        <span className="enlace">Rastrear envío</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

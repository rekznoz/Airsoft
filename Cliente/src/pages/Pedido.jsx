
import {Link, useLoaderData} from "react-router-dom"
import '../css/pedidos.css'

/**
 * Componente para mostrar los detalles de un pedido específico.
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra los detalles de un pedido, incluyendo el ID del usuario, el producto, la dirección de envío, la cantidad, el estado del pedido y las fechas de creación y actualización.
 */
export default function Pedido() {
    const pedido = useLoaderData()

    return (
        <div className="pedido-container">
            <h1 className="pedido-titulo">📦 Pedido #{pedido.id}</h1>
            <div className="pedido-detalles">
                <div className="detalle">
                    <span className="etiqueta">🧑 Usuario ID</span>
                    <span className="valor">{pedido.user.id}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🛒 Producto ID</span>
                    <span className="valor">
                        <Link to={`/tienda/${pedido.producto.id}`} className="enlace">
                            {pedido.producto.nombre}
                        </Link>
                    </span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">📍 Dirección de envío</span>
                    <span className="valor">{pedido.direccion_envio}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🔢 Cantidad</span>
                    <span className="valor">{pedido.cantidad}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🚚 Estado</span>
                    <span className={`valor estado ${pedido.estado}`}>
                        {pedido.estado}
                    </span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">📅 Creado</span>
                    <span className="valor">{new Date(pedido.created_at).toLocaleString()}</span>
                </div>
                <div className="detalle">
                    <span className="etiqueta">🕒 Actualizado</span>
                    <span className="valor">{new Date(pedido.updated_at).toLocaleString()}</span>
                </div>
                {/* Codigo de Envio */}
                <div className="detalle">
                    <span className="etiqueta">📦 Código de envío</span>
                    <span className="valor">
                        {pedido.codigo_envio || "No disponible"}
                    </span>
                </div>
                {/* Enlace a la empresa de envios */}
                <div className="detalle">
                    <span className="etiqueta">🚚 Empresa de envíos</span>
                    <a href={`https://www.correos.es/es/es/herramientas/localizador/envios`} target="_blank" className="valor">
                        <span className="enlace">Rastrear envío</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

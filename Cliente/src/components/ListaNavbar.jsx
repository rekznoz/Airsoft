import {Link} from "react-router-dom"
import carritoStore from "../context/CarritoStore.jsx"
import {useEffect, useState} from "react"
import PedidosService from "../services/PedidosService.jsx"

export function ListaNavbar({setMenuOpen, isLoggedIn, logout, userid, roles}) {

    const [tienePedidosPendientes, setTienePedidosPendientes] = useState(false)

    useEffect(() => {
        const comprobarPedidosPendientes = async () => {
            if (!isLoggedIn || !userid) return
            try {
                const pedidos = await PedidosService.getPedidos()
                const pendientes = pedidos.some(p => p.estado === 'pendiente')
                setTienePedidosPendientes(pendientes)
            } catch (error) {
                console.error("Error al verificar pedidos pendientes:", error)
            }
        }
        comprobarPedidosPendientes()
    }, [isLoggedIn, userid])

    return (
        <ul className="nav-list">
            <li className="nav-item" onClick={() => setMenuOpen(false)}>
                <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item" onClick={() => setMenuOpen(false)}>
                <Link to="/tienda" className="nav-link">Tienda</Link>
            </li>
            {isLoggedIn ? (
                <>
                    {roles.includes('admin') && (
                        <li className="nav-item nav-item-con-notificacion" onClick={() => setMenuOpen(false)}>
                            <Link to="/gestor" className="nav-link">
                                Gestor
                                {tienePedidosPendientes && (
                                    <span className="badge-pedidos" title="Pedidos pendientes">!</span>
                                )}
                            </Link>
                        </li>
                    )}
                    <li className="nav-item" onClick={() => setMenuOpen(false)}>
                        <Link to={`/perfil/${userid}`} className="nav-link">Perfil</Link>
                    </li>
                    <li className="nav-item" onClick={() => {
                        //logoutAuth(token)
                        logout()
                        setMenuOpen(false)
                    }}>
                        <Link to="/" className="nav-link">Logout</Link>
                    </li>
                </>
            ) : (
                <li className="nav-item" onClick={() => setMenuOpen(false)}>
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            )}
        </ul>
    )
}
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import PedidosService from "../services/PedidosService.jsx"

/**
 * Componente de navegación para la lista de productos.
 * @param setMenuOpen
 * @param isLoggedIn
 * @param logout
 * @param userid
 * @param roles
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra una lista de navegación con enlaces a diferentes secciones de la aplicación.
 * @param {function} setMenuOpen - Función para abrir o cerrar el menú de navegación.
 * @param {boolean} isLoggedIn - Indica si el usuario está autenticado.
 * @param {function} logout - Función para cerrar sesión del usuario.
 * @param {string} userid - ID del usuario autenticado.
 * @param {Array} roles - Roles del usuario autenticado.
 */
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
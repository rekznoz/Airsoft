import {useEffect, useState} from "react"
import "../css/header.css"
import {Link, useLocation} from "react-router-dom"

import Logo from "../assets/logo.png"
import claro from '../assets/navbar/claro.png'
import oscuro from '../assets/navbar/oscuro.png'
import CarritoIcon from "../assets/navbar/carrito.png"
import carritoLleno from "../assets/navbar/carritolleno.png"

import usuarioStore from "../context/UsuarioStore.jsx"
import carritoStore from "../context/CarritoStore.jsx"
import {ListaNavbar} from "./ListaNavbar.jsx";
import PedidosService from "../services/PedidosService.jsx";

export default function Header() {

    const location = useLocation()
    const removeFromCart = carritoStore(state => state.removeFromCart)
    const addToCart = carritoStore(state => state.addToCart)
    const restarFromCart = carritoStore(state => state.restarFromCart)
    const clearCart = carritoStore(state => state.clearCart)

    const [modo, setModo] = useState('claro')
    const [menuOpen, setMenuOpen] = useState(false)
    const [mostrarMiniCarrito, setMostrarMiniCarrito] = useState(false)

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

    const abrirMenuMovil = () => {
        if (menuOpen) {
            setMenuOpen(false)
            setMostrarMiniCarrito(false)
        } else {
            setMenuOpen(true)
            setMostrarMiniCarrito(false)
        }
    }

    const abrirMiniCarrito = () => {
        if (mostrarMiniCarrito) {
            setMostrarMiniCarrito(false)
        } else {
            setMostrarMiniCarrito(true)
            setMenuOpen(false)
        }
    }

    const isLoggedIn = usuarioStore(state => state.logueado)
    const logout = usuarioStore(state => state.logout)
    const userid = usuarioStore(state => state.user.id)
    const roles = usuarioStore(state => state.user.roles)

    //const totalItems = useUserStore(state => state.totalItems)
    const carrito = carritoStore(state => state.informacionCarrito)

    const cambiarModo = () => {
        const nuevoModo = modo === 'claro' ? 'oscuro' : 'claro'
        setModo(nuevoModo)
        document.body.classList.toggle('modo-oscuro')
    }

    const mostrarCarrito = location.pathname === '/tienda' || location.pathname.startsWith('/tienda/')

    return (
        <header className="header">

            {/* BARRA SUPERIOR */}
            <nav className="navbar-superior">
                <div className="navbar-izquierda">
                    <span>Horario: Lunes a Viernes - 10:30 a 18:50 | Sábados - 11 a 15:00</span>
                </div>
                {/*
                <div className="navbar-derecha">
                    <Link to="/newsletter">NEWSLETTER</Link>
                    <Link to="/contacto">CONTACTO</Link>
                    <Link to="/faqs">FAQS</Link>
                </div>
                */}

            </nav>

            <nav className="navbar-medio">

                <div className="navbar-izquierda">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="Logo"/>
                        </Link>
                    </div>
                </div>

                <div className="navbar-centro">
                    {/* NAVEGACIÓN */}
                    <ListaNavbar
                        setMenuOpen={setMenuOpen}
                        isLoggedIn={isLoggedIn}
                        logout={logout}
                        userid={userid}
                        roles={roles}
                    />
                </div>

                <div className="navbar-derecha">

                    {/* ICONO CARRITO */}
                    {isLoggedIn && mostrarCarrito && (
                        <div className="carrito" onClick={abrirMiniCarrito}>
                            <span className="carrito-boton" aria-label="Ver carrito">
                                {
                                    carrito.length > 0 ? (
                                        <img src={carritoLleno} alt="Carrito lleno"/>
                                    ) : (
                                        <img src={CarritoIcon} alt="Carrito vacío"/>
                                    )
                                }
                            </span>
                        </div>
                    )}

                    {/* ICONO MODO CLARO OSCURO */}
                    <div className="modo">
                        <button className="modo-boton" onClick={cambiarModo} aria-label="Cambiar modo claro/oscuro">
                            <img src={modo === 'claro' ? claro : oscuro} alt="Modo claro/oscuro"/>
                        </button>
                    </div>

                    {/* ICONO MENU */}
                    <button className="menu-toggle" aria-label="Abrir menú de navegación" onClick={abrirMenuMovil}>
                        <span aria-hidden="true">☰</span>
                    </button>

                </div>

            </nav>

            {/* BARRA INFERIOR (Version nav-list para movil) y para mini carrito */}
            <nav className={`navbar-inferior ${menuOpen ? 'open' : ''}`}>
                <ListaNavbar
                    setMenuOpen={setMenuOpen}
                    isLoggedIn={isLoggedIn}
                    logout={logout}
                    userid={userid}
                    roles={roles}
                />
            </nav>

            {/* MINI CARRITO */}
            {mostrarCarrito && (
                <div className={`mini-carrito ${mostrarMiniCarrito ? 'visible' : ''}`}>
                    {carrito.length === 0 ? (
                        <p className="mini-carrito-vacio">El carrito está vacío</p>
                    ) : (
                        <ul>
                            {carrito.map((producto, index) => (
                                <li key={index} className="mini-carrito-item">
                                    <span><Link to={`/tienda/${producto.id}`}>{producto.nombre}</Link></span>
                                    <span>{producto.precio.toFixed(2)}€</span>
                                    <div className="mini-carrito-contador">
                                        <button onClick={() => restarFromCart(producto)}>-</button>
                                        <span>{producto.cantidad}</span>
                                        <button onClick={() => addToCart(producto)}>+</button>
                                    </div>
                                    <span className="mini-carrito-eliminar"
                                          onClick={() => removeFromCart(producto.id)}>Eliminar</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {carrito.length > 0 && (
                        <button className="mini-carrito-vaciar" onClick={clearCart}>
                            Vaciar carrito
                        </button>
                    )}
                    <p className="mini-carrito-total">Total: {carrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}€</p>
                    <Link to="/carrito" className="mini-carrito-ver">Ver carrito</Link>
                </div>
            )}

        </header>
    )
}

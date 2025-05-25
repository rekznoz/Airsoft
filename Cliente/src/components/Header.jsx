import {useState} from "react"
import "../css/header.css"
import {Link, useLocation} from "react-router-dom"

import Logo from "../assets/logo.png"
import claro from '../assets/navbar/claro.png'
import oscuro from '../assets/navbar/oscuro.png'
import useUserStore from "../context/AuthC.jsx"
import CarritoIcon from "../assets/navbar/carrito.png"

function ListaNavbar({setMenuOpen, isLoggedIn, logout, userid}) {
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
                    <li className="nav-item" onClick={() => setMenuOpen(false)}>
                        <Link to={`/perfil/${userid}`} className="nav-link">Perfil</Link>
                    </li>
                    <li className="nav-item" onClick={() => {
                        //logoutAuth(token)
                        logout()
                        setMenuOpen(false)
                    }}>
                        <Link to="/" className="nav-link">Cerrar sesión</Link>
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

export default function Header() {

    const location = useLocation()
    const removeFromCart = useUserStore(state => state.removeFromCart)

    const [modo, setModo] = useState('claro')
    const [menuOpen, setMenuOpen] = useState(false)
    const [mostrarMiniCarrito, setMostrarMiniCarrito] = useState(false)

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

    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const logout = useUserStore(state => state.logout)
    const userid = useUserStore(state => state.user.id)

    //const totalItems = useUserStore(state => state.totalItems)
    const carrito = useUserStore(state => state.cart)

    const cambiarModo = () => {
        const nuevoModo = modo === 'claro' ? 'oscuro' : 'claro'
        setModo(nuevoModo)
        document.body.classList.toggle('modo-oscuro')
    }

    const mostrarCarrito = location.pathname === '/tienda'

    return (
        <header className="header">

            {/* BARRA SUPERIOR */}
            <nav className="navbar-superior">
                <div className="navbar-izquierda">
                    <span>Horario: Lunes a Viernes - 10:30 a 18:50 | Sábados - 11 a 15:00</span>
                </div>
                <div className="navbar-derecha">
                    <Link to="/newsletter">NEWSLETTER</Link>
                    <Link to="/contacto">CONTACTO</Link>
                    <Link to="/faqs">FAQS</Link>
                </div>
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
                    />
                </div>

                <div className="navbar-derecha">

                    {/* ICONO CARRITO */}
                    {isLoggedIn && mostrarCarrito && (
                        <div className="carrito" onClick={abrirMiniCarrito}>
                            <span className="carrito-boton" aria-label="Ver carrito">
                                <img src={CarritoIcon} alt="Carrito"/>
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
                />
            </nav>

            {/* MINI CARRITO */}
            <div className={`mini-carrito ${mostrarMiniCarrito ? 'visible' : ''}`}>
                {carrito.length === 0 ? (
                    <p className="mini-carrito-vacio">El carrito está vacío</p>
                ) : (
                    <ul>
                        {carrito.map((producto, index) => (
                            <li key={index} className="mini-carrito-item">
                                <span><Link to={`/tienda/${producto.id}`}>{producto.nombre}</Link></span>
                                <span>{producto.precio.toFixed(2)}€</span>
                                <span>{producto.cantidad || 1}</span>
                                <span className="mini-carrito-eliminar"
                                      onClick={() => removeFromCart(producto.id)}>Eliminar</span>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="mini-carrito-total">Total: {carrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2)}€</p>
                <Link to="/carrito" className="mini-carrito-ver">Ver carrito</Link>
            </div>

        </header>
    )
}

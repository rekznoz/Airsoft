import {useState} from "react"
import "../css/header.css"
import {Link} from "react-router-dom"

import Logo from "../assets/logo.png"
import claro from '../assets/navbar/claro.png'
import oscuro from '../assets/navbar/oscuro.png'
import useUserStore from "../context/AuthC.jsx"
import {logoutAuth} from "../services/UsuarioService.jsx"

export default function Header() {

    const [modo, setModo] = useState('claro')
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(!menuOpen)

    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const logout = useUserStore(state => state.logout)
    const userid = useUserStore(state => state.user.id)
    //const token = useUserStore(state => state.access_token)

    const cambiarModo = () => {
        setTimeout(() => {
            const nuevoModo = modo === 'claro' ? 'oscuro' : 'claro'
            setModo(nuevoModo)
            document.body.classList.toggle('modo-oscuro')
        }, 300)
    }

    return (
        <header className="header">

            {/* BARRA SUPERIOR */}
            <nav className="navbar-superior">
                <div className="narbar-izquierda">
                    <span>Horario: Lunes a Viernes - 10:30 a 18:50 | Sábados - 11 a 15:00</span>
                </div>
                <div className="navbar-derecha">
                    <a href="#" aria-label="Facebook">📘</a>
                    <Link to="/newsletter">NEWSLETTER</Link>
                    <Link to="/contacto">CONTACTO</Link>
                    <Link to="/faqs">FAQS</Link>
                </div>
            </nav>

            <nav className="navbar-medio">

                {/* LOGO */}
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo"/>
                    </Link>
                </div>

                {/* NAVEGACIÓN */}
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
                                <Link to={"/perfil" + "/" + userid} className="nav-link">Perfil</Link>
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

                {/* ICONO MODO CLARO OSCURO */}
                <div className="modo">
                    <button className="modo-boton" onClick={cambiarModo} aria-label="Cambiar modo claro/oscuro">
                        <img src={modo === 'claro' ? claro : oscuro} alt="Modo claro/oscuro"/>
                    </button>
                </div>

                {/* BOTÓN MENÚ (versión móvil) */}
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú de navegación">
                    ☰
                </button>

            </nav>

            {/* BARRA INFERIOR (Version nav-list para movil) */}
            <nav className={`navbar-inferior ${menuOpen ? "open" : ""}`}>
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
                                <Link to={"/perfil" + "/" + userid} className="nav-link">Perfil</Link>
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
            </nav>

        </header>
    )
}

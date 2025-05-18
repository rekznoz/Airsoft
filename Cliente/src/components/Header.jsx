import {useState} from "react";
import "../css/header.css";
import {Link} from "react-router-dom";

import Logo from "../assets/logo.png";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navItems = [
        { path: "/", label: "Inicio" },
        { path: "/tienda", label: "Tienda" },
        { path: "/contacto", label: "Contacto" },
        { path: "/login", label: "Login" },
    ];

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
                    {navItems.map(({ path, label }) => (
                        <li key={path} className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to={path} className="nav-link">{label}</Link>
                        </li>
                    ))}
                </ul>

                {/* BOTÓN MENÚ (versión móvil) */}
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú de navegación">
                    ☰
                </button>

            </nav>

            {/* BARRA INFERIOR (Version nav-list para movil) */}
            <nav className={`navbar-inferior ${menuOpen ? "open" : ""}`}>
                <ul className="nav-list">
                    {navItems.map(({ path, label }) => (
                        <li key={path} className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to={path} className="nav-link">{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

        </header>
    );
}

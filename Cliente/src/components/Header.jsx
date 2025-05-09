import "../css/header.css"

export default function Header() {
    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#home" className="nav-link">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link">Sobre Nosotros</a>
                    </li>
                    <li className="nav-item">
                        <a href="#services" className="nav-link">Servicios</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link">Contacto</a>
                    </li>
                    <li className="nav-item">
                        <a href="#login" className="nav-link">Iniciar Sesión</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
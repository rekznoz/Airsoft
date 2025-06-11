import {Link} from "react-router-dom";

export function ListaNavbar({setMenuOpen, isLoggedIn, logout, userid, roles}) {
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
                        <li className="nav-item" onClick={() => setMenuOpen(false)}>
                            <Link to="/gestor" className="nav-link">Gestor</Link>
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
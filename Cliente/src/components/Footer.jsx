import "../css/footer.css"

/**
 * Componente Footer
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente muestra el pie de página de la aplicación, incluyendo derechos de autor.
 */
export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">© 2025 - Todos los derechos reservados</p>
        </footer>
    )
}
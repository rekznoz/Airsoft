import "../css/error.css";
import {Link} from "react-router-dom";

export default function Error({ code, message }) {

    const errorMessages = {
        404: {
            title: "404",
            description: "La página que buscas no existe.",
        },
        403: {
            title: "403",
            description: "No tienes permiso para acceder a esta página.",
        },
        500: {
            title: "500",
            description: "Ha ocurrido un error interno en el servidor.",
        },
    };

    const error = errorMessages[code] || {
        title: code || "Error !",
        description: message || "Ha ocurrido un error inesperado.",
    };

    return (
        <div className="error-page">
            <div className="error-box">
                <h1 className="error-code">{error.title}</h1>
                <p className="error-message">{message || error.description}</p>
                <Link to="/" className="error-button">Volver al inicio</Link>
            </div>
        </div>
    );
}

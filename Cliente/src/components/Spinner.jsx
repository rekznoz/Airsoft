import {Component} from "react"
import "../css/spinner.css"

/**
 * Componente Spinner
 * @description Este componente muestra un spinner de carga mientras se realizan operaciones asíncronas.
 * @returns {JSX.Element}
 */
class Spinner extends Component {
    render() {
        return (
            <div id="cargador">
                <div id="spinner"></div>
            </div>
        )
    }
}

export default Spinner
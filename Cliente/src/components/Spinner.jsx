import {Component} from "react"
import "../css/spinner.css"

/**
 * Componente de carga
 * @returns {JSX.Element} Componente
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
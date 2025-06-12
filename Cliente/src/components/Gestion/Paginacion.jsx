import {useState, useEffect} from "react"
import "../../css/paginacion.css"

/**
 * Componente de paginación.
 * @description Este componente permite paginar una lista de elementos, mostrando botones para navegar entre páginas.
 * @param {number} totalItems - Total de elementos a paginar.
 * @param {number} [itemsPerPage=6] - Cantidad de elementos por página (por defecto 6).
 * @param {function} onPageChange - Función que se llama al cambiar de página, recibe un objeto con el rango de elementos y la página actual.
 */
export default function Paginacion({totalItems, itemsPerPage = 6, onPageChange}) {

    const totalPaginas = Math.ceil(totalItems / itemsPerPage)
    const [paginaActual, setPaginaActual] = useState(1)

    useEffect(() => {
        const start = (paginaActual - 1) * itemsPerPage
        const end = paginaActual * itemsPerPage
        onPageChange({start, end, pagina: paginaActual})
    }, [paginaActual, totalItems])

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina)
        }
    }

    return (
        <div className="paginacion">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                Anterior
            </button>

            {[...Array(totalPaginas)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => cambiarPagina(i + 1)}
                    className={paginaActual === i + 1 ? "activo" : ""}
                >
                    {i + 1}
                </button>
            ))}

            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                Siguiente
            </button>
        </div>
    )
}

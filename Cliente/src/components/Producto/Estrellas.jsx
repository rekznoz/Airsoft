/**
 * Estrellas.jsx
 * @param calificacion
 * @param max
 * @param interactivas
 * @param valorSeleccionado
 * @param setValor
 * @returns {JSX.Element}
 * @constructor
 * @description Componente para mostrar estrellas de calificación.
 * Este componente muestra un número de estrellas basado en la calificación proporcionada.
 * Si `interactivas` es `true`, permite al usuario seleccionar una calificación haciendo clic en las estrellas.
 * @param {number} calificacion - Calificación del producto (0-10).
 * @param {number} [max=5] - Número máximo de estrellas a mostrar (por defecto 5).
 * @param {boolean} [interactivas=false] - Si es `true`, las estrellas son interactivas y permiten seleccionar una calificación.
 * @param {number} [valorSeleccionado=0] - Valor de calificación seleccionado por el usuario (0-5).
 * @param {function} setValor - Función para actualizar el valor de calificación seleccionado.
 */
export default function Estrellas({
                                      calificacion = 0,
                                      max = 5,
                                      interactivas = false,
                                      valorSeleccionado = 0,
                                      setValor = () => {
                                      }
                                  }
) {
    const estrellasLlenas = Math.round((calificacion / 10) * max)

    const renderEstrella = (i) => {
        const valor = i + 1
        const color = interactivas
            ? valor <= valorSeleccionado
                ? "#f5b301"
                : "#ccc"
            : valor <= estrellasLlenas
                ? "#f5b301"
                : "#ccc"

        return (
            <span
                key={valor}
                onClick={interactivas ? () => setValor(valor) : undefined}
                style={{
                    cursor: interactivas ? "pointer" : "default",
                    color,
                    fontSize: "1.5rem",
                    marginRight: "0.2rem"
                }}
            >
                ★
            </span>
        )
    }

    return (
        <span className="estrellas">
            {[...Array(max)].map((_, i) => renderEstrella(i))}
            {interactivas && valorSeleccionado > 0 && (
                <span className="texto-calificacion">({valorSeleccionado * 2}/10)</span>
            )}
        </span>
    )
}

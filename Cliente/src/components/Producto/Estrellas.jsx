export default function Estrellas({
                                      calificacion = 0,
                                      max = 5,
                                      interactivas = false,
                                      valorSeleccionado = 0,
                                      setValor = () => {}
                                  }) {
    const estrellasLlenas = Math.round((calificacion / 10) * max);

    const renderEstrella = (i) => {
        const valor = i + 1;
        const color = interactivas
            ? valor <= valorSeleccionado
                ? "#f5b301"
                : "#ccc"
            : valor <= estrellasLlenas
                ? "#f5b301"
                : "#ccc";

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
        );
    };

    return (
        <span className="estrellas">
            {[...Array(max)].map((_, i) => renderEstrella(i))}
            {interactivas && valorSeleccionado > 0 && (
                <span className="texto-calificacion">({valorSeleccionado * 2}/10)</span>
            )}
        </span>
    );
}

export default function Estrellas({calificacion, max = 5}) {
    const estrellasLlenas = Math.round((calificacion / 10) * max);
    const estrellas = [];

    for (let i = 1; i <= max; i++) {
        estrellas.push(
            <span key={i} style={{color: i <= estrellasLlenas ? "#f5b301" : "#ccc"}}>
                ★
            </span>
        );
    }

    return <span className="estrellas">{estrellas}</span>;
}
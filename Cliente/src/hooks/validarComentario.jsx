import Swal from "sweetalert2";

export default function validarComentario(comentario, calificacion) {
    if (comentario.trim() === "") {
        Swal.fire({ icon: "error", title: "Error", text: "El comentario no puede estar vacío." });
        return false;
    }
    if (calificacion === 0) {
        Swal.fire({ icon: "error", title: "Error", text: "Debes seleccionar una calificación." });
        return false;
    }
    return true;
}

import Swal from "sweetalert2"

/**
 * Función para validar un comentario y su calificación.
 * @param comentario
 * @param calificacion
 * @returns {boolean}
 * @description Esta función verifica que el comentario no esté vacío y que se haya seleccionado una calificación.
 * Si el comentario está vacío o no se ha seleccionado una calificación, muestra un mensaje de error utilizando SweetAlert2.
 * @param {string} comentario - El texto del comentario a validar.
 * @param {number} calificacion - La calificación seleccionada (debe ser mayor a 0).
 */
export default function validarComentario(comentario, calificacion) {
    if (comentario.trim() === "") {
        Swal.fire({ icon: "error", title: "Error", text: "El comentario no puede estar vacío." })
        return false
    }
    if (calificacion === 0) {
        Swal.fire({ icon: "error", title: "Error", text: "Debes seleccionar una calificación." })
        return false
    }
    return true
}

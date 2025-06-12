/**
 * ModalImagen.jsx
 * @param imagenUrl
 * @param onClose
 * @returns {JSX.Element}
 * @constructor
 * @description Componente para mostrar una imagen ampliada en un modal.
 * Este componente muestra una imagen en un modal y permite cerrarlo al hacer clic en la imagen o en el botón de cerrar.
 * @param {string} imagenUrl - URL de la imagen a mostrar.
 * @param {function} onClose - Función que se llama al cerrar el modal.
 */
export default function ModalImagen({imagenUrl, onClose}) {
    return (
        <div className="modal-imagen" onClick={onClose}>
            <img src={imagenUrl} alt="Imagen ampliada"/>
            <span className="cerrar-modal" onClick={onClose}>&times;</span>
        </div>
    )
}

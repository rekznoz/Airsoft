export default function ModalImagen({imagenUrl, onClose}) {
    return (
        <div className="modal-imagen" onClick={onClose}>
            <img src={imagenUrl} alt="Imagen ampliada"/>
            <span className="cerrar-modal" onClick={onClose}>&times;</span>
        </div>
    );
}

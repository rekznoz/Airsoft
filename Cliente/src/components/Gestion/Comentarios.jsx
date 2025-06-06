/*
{
    "id": 1,
    "user": {
      "id": 5,
      "nombre": "Ignacio Abrego"
    },
    "producto": {
      "id": 1,
      "nombre": "enim placeat quia"
    },
    "comentario": "Necessitatibus dolores accusamus dolorum sunt quo consequuntur est.",
    "calificacion": 4,
    "created_at": "2025-05-23T14:25:58.000000Z",
    "updated_at": "2025-05-23T14:25:58.000000Z"
}
*/

import {useState} from "react"
import Paginacion from "./Paginacion.jsx"
import Estrellas from "../Producto/Estrellas.jsx"
import {Link} from "react-router-dom"

import "../../css/gestion/comentarios.css"
import Swal from "sweetalert2";
import ComentariosService from "../../services/ComentariosService.jsx";
import usuarioStore from "../../context/UsuarioStore.jsx";

export default function Comentarios({comentarios}) {

    const access_token = usuarioStore(state => state.access_token)
    const [comentariosPagina, setComentariosPagina] = useState([])
    const itemsPerPage = 6

    const manejarCambioPagina = ({start, end}) => {
        const comentariosPaginados = comentarios.slice(start, end)
        setComentariosPagina(comentariosPaginados)
    }

    const onEditar = (id) => {
        // Aquí puedes implementar la lógica para editar el comentario
        console.log("Editar comentario:", id)
    }

    // deleteComentario
    const onEliminar = (id) => {
        Swal.fire(
            {
                title: '¿Estás seguro?',
                text: "¡No podrás deshacer esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo'
            }
        ).then((result) => {
                if (result.isConfirmed) {
                    ComentariosService.deleteComentario({params: {id: id, access_token: access_token}})
                        .then(() => {
                                Swal.fire(
                                    'Eliminado',
                                    'El comentario ha sido eliminado.',
                                    'success'
                                )
                                // Actualizar la lista de comentarios
                                const nuevosComentarios = comentarios.filter(c => c.id !== id)
                                manejarCambioPagina({start: 0, end: itemsPerPage})
                                setComentariosPagina(nuevosComentarios.slice(0, itemsPerPage))
                            }
                        )
                        .catch(error => {
                                Swal.fire(
                                    'Error',
                                    'No se pudo eliminar el comentario. Inténtalo más tarde.',
                                    'error'
                                )
                            }
                        )
                }
            }
        )
    }

    return (
        <div className="comentarios-contenedor">
            <h1>Comentarios</h1>

            {comentarios.length > 0 ? (
                <>
                    {comentariosPagina.map((comentario, index) => (
                        <div key={index} className="comentario">
                            <p>
                                <strong>Usuario: </strong>
                                <Link to={`/perfil/${comentario.user.id}`}>
                                    {comentario.user.nombre}
                                </Link>
                            </p>
                            <p>
                                <strong>Producto: </strong>
                                <Link to={`/tienda/${comentario.producto.id}`}>
                                    {comentario.producto.nombre}
                                </Link>
                            </p>
                            <p>
                                {comentario.comentario}
                            </p>
                            <p>
                                <em>{new Date(comentario.created_at).toLocaleDateString()}</em>
                                <Estrellas calificacion={comentario.calificacion}/>
                            </p>

                            <div className="acciones-comentario">
                                <button
                                    className="btn-editar"
                                    onClick={() => onEditar(comentario.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn-eliminar"
                                    onClick={() => onEliminar(comentario.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    <Paginacion
                        totalItems={comentarios.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={manejarCambioPagina}
                    />
                </>
            ) : (
                <p>No hay comentarios disponibles.</p>
            )}
        </div>
    )
}

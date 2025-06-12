
import {useEffect, useState} from "react"
import Paginacion from "./Paginacion"
import "../../css/gestion/categorias.css"
import CategoriasService from "../../services/CategoriasService.jsx"
import Swal from "sweetalert2"
import usuarioStore from "../../context/UsuarioStore.jsx"

/**
 * Componente para gestionar categorías de productos.
 * @returns {JSX.Element}
 * @constructor
 * @description Este componente permite visualizar, crear y eliminar categorías de productos.
 * @param {Array} categorias - Lista de categorías a gestionar.
 */
export default function Categorias({categorias}) {

    const cantidadPorPagina = 3
    const [rangoVisible, setRangoVisible] = useState({start: 0, end: cantidadPorPagina, pagina: 1})
    const [listaCategorias, setListaCategorias] = useState(categorias)
    const access_token = usuarioStore(state => state.access_token)

    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false)
    const [nuevaCategoria, setNuevaCategoria] = useState({nombre: "", descripcion: ""})

    useEffect(() => {
        setListaCategorias(categorias)
    }, [categorias])

    useEffect(() => {
        // Ajustar la página actual si se eliminó la última categoría visible
        const totalPaginas = Math.ceil(listaCategorias.length / cantidadPorPagina)
        if (rangoVisible.pagina > totalPaginas && totalPaginas > 0) {
            const nuevaPagina = totalPaginas
            const start = (nuevaPagina - 1) * cantidadPorPagina
            const end = nuevaPagina * cantidadPorPagina
            setRangoVisible({start, end, pagina: nuevaPagina})
        }
    }, [listaCategorias])


    const onEliminar = async (categoria) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar esta categoría!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarla'
        })

        if (result.isConfirmed) {
            try {
                console.log(categoria)
                await CategoriasService.deleteCategoria({params: {id: categoria.id, access_token: access_token}})
                setListaCategorias(prev => prev.filter(cat => cat.id !== categoria.id))
                Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success')
            } catch (error) {
                console.error("Error al eliminar la categoría:", error)
                Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error')
            }
        }
    }

    const onCrearCategoria = async (e) => {
        e.preventDefault()
        if (!nuevaCategoria.nombre.trim()) {
            return Swal.fire('Error', 'El nombre de la categoría es obligatorio.', 'error')
        }

        console.log(nuevaCategoria)
        try {
            const nueva = await CategoriasService.postCategoria({
                params: {
                    nombre: nuevaCategoria.nombre,
                    descripcion: nuevaCategoria.descripcion,
                    access_token
                }
            })
            setListaCategorias(prev => [...prev, nueva])
            setMostrarModalNuevo(false)
            setNuevaCategoria({nombre: "", descripcion: ""})
            Swal.fire('Éxito', 'Categoría creada correctamente.', 'success')
        } catch (error) {
            console.error("Error al crear la categoría:", error)
            Swal.fire('Error', 'No se pudo crear la categoría.', 'error')
        }
    }

    const categoriasVisibles = listaCategorias.slice(rangoVisible.start, rangoVisible.end)

    return (
        <div className="categorias-contenedor">

            <button onClick={() => setMostrarModalNuevo(true)} className="boton-nueva-categoria">
                + Nueva Categoria
            </button>

            {categoriasVisibles.length > 0 ? (
                <ul className="lista-categorias">
                    {categoriasVisibles.map((categoria) => (
                        <li key={categoria.id || categoria.nombre} className="categoria-item">
                            <div className="categoria-header">
                                <h2 className="categoria-nombre">{categoria.nombre}</h2>
                                <button
                                    className="btn-eliminar"
                                    onClick={() => onEliminar(categoria)}
                                >
                                    Eliminar
                                </button>
                            </div>
                            <p className="categoria-descripcion">{categoria.descripcion}</p>
                            <div className="categoria-fechas">
                                <span className="fecha-creacion">
                                    Creado: {new Date(categoria.created_at).toLocaleDateString()}
                                </span>
                                <span className="fecha-actualizacion">
                                    Actualizado: {new Date(categoria.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mensaje-vacio">No hay categorías disponibles.</p>
            )}

            {listaCategorias.length > cantidadPorPagina && (
                <Paginacion
                    totalItems={listaCategorias.length}
                    itemsPerPage={cantidadPorPagina}
                    onPageChange={(rango) => setRangoVisible(rango)}
                />
            )}

            {/* Modal para nueva categoría */}
            {mostrarModalNuevo && (
                <div className="modal-fondo">
                    <div className="modal-contenido">
                        <h2>Nueva Categoría</h2>
                        <form onSubmit={onCrearCategoria}>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={nuevaCategoria.nombre}
                                onChange={e => setNuevaCategoria({...nuevaCategoria, nombre: e.target.value})}
                                required
                            />
                            <label>Descripción:</label>
                            <textarea
                                value={nuevaCategoria.descripcion}
                                onChange={e => setNuevaCategoria({...nuevaCategoria, descripcion: e.target.value})}
                            ></textarea>
                            <div className="modal-botones">
                                <button type="submit">Crear</button>
                                <button type="button" onClick={() => setMostrarModalNuevo(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

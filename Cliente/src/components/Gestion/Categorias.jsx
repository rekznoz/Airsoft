/*
{
    "nombre": "Airsoft",
    "descripcion": "Productos de categoría: Airsoft",
    "created_at": "2025-05-23 14:25:55",
    "updated_at": "2025-05-23 14:25:55"
  }
*/

import { useEffect, useState } from "react"
import Paginacion from "./Paginacion"
import "../../css/gestion/categorias.css"

export default function Categorias({ categorias }) {

    const cantidadPorPagina = 3
    const [rangoVisible, setRangoVisible] = useState({ start: 0, end: cantidadPorPagina, pagina: 1 })
    const [listaCategorias, setListaCategorias] = useState(categorias)

    useEffect(() => {
        setListaCategorias(categorias)
    }, [categorias])

    const onEliminar = (categoria) => {
        if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
            console.log(`Categoría "${categoria.nombre}" eliminada.`)
            setListaCategorias(prev => prev.filter(c => c.nombre !== categoria.nombre))
        }
    }

    const categoriasVisibles = listaCategorias.slice(rangoVisible.start, rangoVisible.end)

    return (
        <div className="categorias-contenedor">
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
        </div>
    )
}

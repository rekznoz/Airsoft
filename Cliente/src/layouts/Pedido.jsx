import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from "react-router-dom"
import usuarioStore from "../context/UsuarioStore.jsx"
import PedidosService from "../services/PedidosService.jsx"

/**
 * Componente de diseño para pedidos.
 * @returns {Element}
 * @constructor
 * @description Este componente se encarga de cargar un pedido específico basado en su ID y verificar los permisos del usuario.
 * Si el usuario no es administrador ni el dueño del pedido, se redirige a una página de no autorizado.
 * Si el pedido no se encuentra, se redirige a una página de no encontrado.
 */
function PedidoLayout() {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = usuarioStore(state => state.user) // { id, role: [] }

    const [pedido, setPedido] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPedido() {
            try {
                const response = await PedidosService.getPedido({ params: { id } })
                setPedido(response)
                setLoading(false)

                // Comprobamos si no es admin ni dueño
                if (!user.roles.includes('admin') && response.user.id !== user.id) {
                    navigate('/no-autorizado')
                }
            } catch (error) {
                navigate('/no-encontrado')
            }
        }
        fetchPedido()
    }, [id, navigate, user])

    if (loading) return <p>Cargando pedido...</p>

    return (
        <>
            <Outlet context={{ pedido }} />
        </>
    )
}

export default PedidoLayout

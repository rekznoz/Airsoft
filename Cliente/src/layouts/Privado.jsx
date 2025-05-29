import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import usuarioStore from "../context/UsuarioStore.jsx"

/**
 * Layout para rutas de login y registro, para evitar que un usuario logueado acceda a estas rutas
 */
function Privado({ children }) {
    const isLoggedIn = usuarioStore(state => state.logueado)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            navigate('/no-perfil')
        }
    }, [isLoggedIn, navigate])

    return (
        <>
            {children || <Outlet />}
        </>
    )
}

export default Privado

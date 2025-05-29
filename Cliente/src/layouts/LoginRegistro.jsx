import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import useUserStore from "../context/AuthC.jsx"

/**
 * Layout para rutas de login y registro, para evitar que un usuario logueado acceda a estas rutas
 */
function LoginRegistro({ children }) {
    const isLoggedIn = useUserStore(state => state.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    return (
        <>
            {children || <Outlet />}
        </>
    )
}

export default LoginRegistro

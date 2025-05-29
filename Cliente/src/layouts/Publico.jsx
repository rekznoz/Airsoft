import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import usuarioStore from "../context/UsuarioStore.jsx"

//import Login from "../components/Login.jsx"

/**
 * Componente que define el layout público de la aplicación
 * @param children
 * @returns {Element}
 * @constructor
 */
function Publico({children}) {
    usuarioStore.getState().checkTokenValidity()
    return (
        <>
            <Header/>
            <main className='main'>
                {children || <Outlet/>}
            </main>
            <Footer/>
            {/*<Login/>*/}
        </>
    )
}

export default Publico
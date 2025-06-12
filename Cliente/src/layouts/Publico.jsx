import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import usuarioStore from "../context/UsuarioStore.jsx"

//import Login from "../components/Login.jsx"

/**
 * Componente que define el layout público de la aplicación
 * @description Este componente se encarga de renderizar el encabezado, el pie de página y el contenido principal de la aplicación.
 * Además, verifica la validez del token del usuario al cargar.
 * @param {Object} props - Props del componente.
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
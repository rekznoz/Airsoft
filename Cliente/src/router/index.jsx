import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import Loading from "../components/Spinner.jsx";
import ProductosService from "../services/ProductoService.jsx";
import PedidosService from "../services/PedidosService.jsx";
import ComentariosService from "../services/ComentariosService.jsx";
import {getUsuario} from "../services/UsuarioService.jsx";

const Publico = lazy(() => import("../layouts/Publico.jsx"));
const LoginRegistro = lazy(() => import("../layouts/LoginRegistro.jsx"));
const Perfil = lazy(() => import("../layouts/Perfil.jsx"));

const Inicio = lazy(() => import("../pages/Inicio.jsx"));
const Tienda = lazy(() => import("../pages/Tienda.jsx"));
const Producto = lazy(() => import("../pages/Producto.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Registro = lazy(() => import("../pages/Registro.jsx"));
const PerfilUsuario = lazy(() => import("../pages/Perfil.jsx"));
const Error = lazy(() => import("../pages/Error.jsx"));

/**
 * Router de la aplicación
 * @type {Router}
 */
export const router = createBrowserRouter([
    {
        path: "/", // Ruta base de la aplicación
        element: (
            <Suspense fallback={<Loading/>}>
                <Publico/>
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loading/>}>
                <Publico>
                    <Error/>
                </Publico>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Inicio/>
                    </Suspense>
                )
            },
            {
                path: "/tienda",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Tienda/>
                    </Suspense>
                ),
                //loader: getItemsTienda
            },
            {
                path: "/tienda/:id",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Producto/>
                    </Suspense>
                ),
                loader: ProductosService.getProducto
            },
            {
                path: '/login',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <LoginRegistro/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Login/>
                            </Suspense>
                        ),
                    }
                ]
            },
            {
                path: '/registro',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <LoginRegistro/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Registro/>
                            </Suspense>
                        ),
                    }
                ]
            },
            {
                path: '/perfil/:id',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Perfil/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <PerfilUsuario/>
                            </Suspense>
                        ),
                        loader: async ({ params }) => {
                            const [pedidos, comentarios, usuario] = await Promise.all([
                                PedidosService.getPedidosUsuario({ params }),
                                ComentariosService.getComentariosUsuario({ params }),
                                getUsuario(params.id)
                            ]);

                            return {pedidos, comentarios, usuario};
                        }
                    },
                    {/*
                        path: 'pedidos',
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <PedidosUsuario />
                            </Suspense>
                        ),
                    */
                    }
                ],
            },

        ],
    },
]);
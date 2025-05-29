import {createBrowserRouter} from "react-router-dom"
import {lazy, Suspense} from "react"

import Loading from "../components/Spinner.jsx"
import ProductosService from "../services/ProductoService.jsx"
import PedidosService from "../services/PedidosService.jsx"
import ComentariosService from "../services/ComentariosService.jsx"
import {getUsuario} from "../services/UsuarioService.jsx"
import Pedido from "../pages/Pedido.jsx"
import CategoriasService from "../services/CategoriasService.jsx"
import Compra from "../pages/Compra.jsx"
import Gestion from "../pages/Gestion.jsx"

const Publico = lazy(() => import("../layouts/Publico.jsx"))
const LoginRegistro = lazy(() => import("../layouts/LoginRegistro.jsx"))
const Privado = lazy(() => import("../layouts/Privado.jsx"))
const PedidoLayout = lazy(() => import("../layouts/Pedido.jsx"))

const Inicio = lazy(() => import("../pages/Inicio.jsx"))
const Tienda = lazy(() => import("../pages/Tienda.jsx"))
const Producto = lazy(() => import("../pages/Producto.jsx"))
const Login = lazy(() => import("../pages/Login.jsx"))
const Registro = lazy(() => import("../pages/Registro.jsx"))
const Perfil = lazy(() => import("../pages/Perfil.jsx"))
const Error = lazy(() => import("../pages/Error.jsx"))

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
                path: "/no-encontrado",
                element: (
                    <Suspense fallback={<Loading/>}>
                            <Error code={404} message="No encontrado"/>
                    </Suspense>
                )
            },
            {
                path: "/no-autorizado",
                element: (
                    <Suspense fallback={<Loading/>}>
                            <Error code={403} message="No autorizado"/>
                    </Suspense>
                )
            },
            {
                path: "/no-perfil",
                element: (
                    <Suspense fallback={<Loading/>}>
                            <Error code={403} message="Necesitas estar logueado para ver otros usuarios"/>
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
                loader: CategoriasService.getCategorias
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
                path: "/carrito",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Compra/>
                    </Suspense>
                ),
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
                        <Privado/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Perfil/>
                            </Suspense>
                        ),
                        loader: async ({ params }) => {
                            const [pedidos, comentarios, usuario] = await Promise.all([
                                PedidosService.getPedidosUsuario({ params }),
                                ComentariosService.getComentariosUsuario({ params }),
                                getUsuario(params.id)
                            ])

                            return {pedidos, comentarios, usuario}
                        }
                    }
                ],
            },
            {
                path: '/pedido/:id',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <PedidoLayout/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Pedido/>
                            </Suspense>
                        ),
                        loader: PedidosService.getPedido
                    }
                ],
            },
            {
                path: '/gestor',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Privado/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Gestion/>
                            </Suspense>
                        ),
                    }
                ],
            },

        ],
    },
])
import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import Loading from "../components/Spinner.jsx";
import ProductosService from "../services/ProductoService.jsx";
import Producto from "../pages/Producto.jsx";

const Publico = lazy(() => import("../layouts/Publico.jsx"));
const Inicio = lazy(() => import("../pages/Inicio.jsx"));
const Tienda = lazy(() => import("../pages/Tienda.jsx"));
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
            {/*
                path: "usuario/:username",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <PerfilUsuario/>
                    </Suspense>
                ),
                loader: obtenerPerfilePorUsername,
            },
            {
                path: "mascotas",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Mascotas/>
                    </Suspense>
                ),
                loader: obtenerAnimales,
            },
            {
                path: "mascota/:id",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Mascota/>
                    </Suspense>
                ),
                loader: obtenerAnimal,
            },
            {
                path: "/tienda",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Tienda/>
                    </Suspense>
                ),
                loader: obtenerProductosRevisados,
            },
            {
                path: "/tienda/:id",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Producto/>
                    </Suspense>
                ),
                loader: obtenerProductoPorId,
            },
            {
                path: "/blog",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Blog/>
                    </Suspense>
                ),
                loader: obtenerPublicacionesRevisadas,
            },
            {
                path: "/blog/:id",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Publicacion/>
                    </Suspense>
                ),
                loader: obtenerPublicacionPorId,
            },
            {
                path: '/admin',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <LayoutPrivado/>
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Admin/>
                            </Suspense>
                        ),
                        loader: obtenerDatos,
                    }
                ]
            */},
        ],
    },
]);
import { create } from 'zustand'
import Swal from 'sweetalert2'
import productoService from '../services/ProductoService.jsx'

/**
 * Store para gestionar productos en la aplicación.
 * @type {UseBoundStore<Mutate<StoreApi<{productos: [], cargando: boolean, error: null, productosCargados: boolean, cargarProductos: function(): Promise<void>, resetProductos: function(): void}>, []>>}
 * @description
 * Este store utiliza Zustand para manejar el estado de los productos en la aplicación.
 * Permite cargar productos desde un servicio, manejar el estado de carga y errores,
 * y resetear la lista de productos cargados.
 * @property {Array} productos - Lista de productos cargados.
 * @property {boolean} cargando - Indica si los productos están siendo cargados.
 * @property {null|string} error - Mensaje de error si ocurre algún problema al cargar los productos.
 * @property {boolean} productosCargados - Indica si los productos ya han sido cargados.
 * @property {function} cargarProductos - Función para cargar los productos desde el servicio.
 * @property {function} resetProductos - Función para resetear la lista de productos cargados.
 */
const productosStore = create((set, get) => ({

    productos: [],
    cargando: false,
    error: null,
    productosCargados: false,

    cargarProductos: async () => {
        const { productosCargados } = get()
        if (productosCargados) return

        set({ cargando: true, error: null })

        try {
            const productos = await productoService.getProductos()
            set({ productos, cargando: false, productosCargados: true })

        } catch (error) {
            set({ error: error.message, cargando: false })

            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

        }
    },

    resetProductos: () => {
        set({ productos: [], productosCargados: false })
    }

}))

export default productosStore

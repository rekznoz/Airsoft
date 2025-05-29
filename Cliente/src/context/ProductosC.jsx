import { create } from 'zustand'
import Swal from 'sweetalert2'
import productoService from '../services/ProductoService.jsx'

const useProductosStore = create((set, get) => ({

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

export default useProductosStore

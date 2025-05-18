import {create} from 'zustand';
import Swal from 'sweetalert2';
import productoService from '../services/ProductoService.jsx';

const STORAGE_KEY = 'productos_cache';

const useProductosStore = create((set, get) => ({

    productos: [],
    cargando: false,
    error: null,
    productosCargados: false,

    cargarProductos: async () => {
        const {productosCargados} = get();
        if (productosCargados) return;

        // Intenta cargar desde localStorage
        const cache = localStorage.getItem(STORAGE_KEY);
        if (cache) {
            try {
                const productos = JSON.parse(cache); // <--- Ya no usamos .data
                set({productos, productosCargados: true});
                return;
            } catch (e) {
                console.error('Error al parsear el cache de productos:', e);
                localStorage.removeItem(STORAGE_KEY);
            }
        }

        set({cargando: true, error: null});

        try {
            const productos = await productoService.getProductos().data;
            set({productos, cargando: false, productosCargados: true});
            localStorage.setItem(STORAGE_KEY, JSON.stringify(productos)); // <--- Guardamos solo array
        } catch (error) {
            set({error: error.message, cargando: false});
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    },

    resetProductos: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({productos: [], productosCargados: false});
    }

}));

export default useProductosStore;

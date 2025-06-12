import {create} from 'zustand'
import {persist} from 'zustand/middleware'

/**
 * @typedef {import('zustand').StoreApi} StoreApi
 * @type {UseBoundStore<Mutate<StoreApi<{informacionCarrito: [], addToCart: function(*): void, restarFromCart: function(*): void, removeFromCart: function(*): void, clearCart: function(): void, readonly totalItems: *}>, [["zustand/persist", {informacionCarrito: [], addToCart: function(*): void, restarFromCart: function(*): void, removeFromCart: function(*): void, clearCart: function(): void, readonly totalItems: *}]]>>}
 * @description
 * Store para manejar el carrito de compras utilizando Zustand y persistencia en localStorage.
 * Este store permite agregar, restar y eliminar productos del carrito, así como limpiar el carrito completo.
 * Además, calcula el total de artículos en el carrito.
 * @property {Array} informacionCarrito - Lista de productos en el carrito.
 * @property {function} addToCart - Función para agregar un producto al carrito.
 * @property {function} restarFromCart - Función para restar un producto del carrito.
 * @property {function} removeFromCart - Función para eliminar un producto del carrito.
 * @property {function} clearCart - Función para limpiar el carrito completo.
 * @property {number} totalItems - Número total de artículos en el carrito.
 */
const carritoStore = create(persist(
    (set, get) => ({
        informacionCarrito: [],

        addToCart: (producto) => {
            producto.precio = parseFloat(producto.precio)

            const cart = get().informacionCarrito
            const existingItem = cart.find(item => item.id === producto.id)

            if (existingItem) {
                const updatedCart = cart.map(item =>
                    item.id === producto.id
                        ? {...item, cantidad: item.cantidad + 1}
                        : item
                )
                set({informacionCarrito: updatedCart})
            } else {
                set({informacionCarrito: [...cart, {...producto, cantidad: 1}]})
            }
        },

        restarFromCart: (producto) => {
            const cart = get().informacionCarrito
            const existingItem = cart.find(item => item.id === producto.id)

            if (existingItem) {
                if (existingItem.cantidad > 1) {
                    const updatedCart = cart.map(item =>
                        item.id === producto.id
                            ? {...item, cantidad: item.cantidad - 1}
                            : item
                    )
                    set({informacionCarrito: updatedCart})
                } else {
                    // Si la cantidad es 1, lo eliminamos del carrito
                    const updatedCart = cart.filter(item => item.id !== producto.id)
                    set({informacionCarrito: updatedCart})
                }
            }
        },

        removeFromCart: (productId) => {
            const updatedCart = get().informacionCarrito.filter(item => item.id !== productId)
            set({informacionCarrito: updatedCart})
        },

        clearCart: () => {
            set({informacionCarrito: []})
        },

        get totalItems() {
            return get().informacionCarrito.reduce((acc, item) => acc + item.cantidad, 0)
        }
    }),
    {
        name: 'cartStore',
        getStorage: () => localStorage, // mejor que sessionStorage para carritos
    }
))

export default carritoStore

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
                set({ informacionCarrito: updatedCart })
            } else {
                set({ informacionCarrito: [...cart, { ...producto, cantidad: 1 }] })
            }
        },

        restarFromCart: (producto) => {
            const cart = get().informacionCarrito
            const existingItem = cart.find(item => item.id === producto.id)

            if (existingItem) {
                if (existingItem.cantidad > 1) {
                    const updatedCart = cart.map(item =>
                        item.id === producto.id
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : item
                    )
                    set({ informacionCarrito: updatedCart })
                } else {
                    // Si la cantidad es 1, lo eliminamos del carrito
                    const updatedCart = cart.filter(item => item.id !== producto.id)
                    set({ informacionCarrito: updatedCart })
                }
            }
        },

        removeFromCart: (productId) => {
            const updatedCart = get().informacionCarrito.filter(item => item.id !== productId)
            set({ informacionCarrito: updatedCart })
        },

        clearCart: () => {
            set({ informacionCarrito: [] })
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

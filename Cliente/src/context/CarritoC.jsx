import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(persist(
    (set, get) => ({
        cart: [],

        addToCart: (producto) => {
            producto.precio = parseFloat(producto.precio)

            const cart = get().cart
            const existingItem = cart.find(item => item.id === producto.id)

            if (existingItem) {
                const updatedCart = cart.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
                set({ cart: updatedCart })
            } else {
                set({ cart: [...cart, { ...producto, cantidad: 1 }] })
            }
        },

        removeFromCart: (productId) => {
            const updatedCart = get().cart.filter(item => item.id !== productId)
            set({ cart: updatedCart })
        },

        clearCart: () => {
            set({ cart: [] })
        },

        get totalItems() {
            return get().cart.reduce((acc, item) => acc + item.cantidad, 0)
        }
    }),
    {
        name: 'cartStore',
        getStorage: () => localStorage, // mejor que sessionStorage para carritos
    }
))

export default useCartStore

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const usuarioVacio = {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
};

const useUserStore = create(persist((set, get) => ({

        user: usuarioVacio,
        isLoggedIn: false,
        access_token: null,

        cart: [

        ],

        // =====================
        // 👤 Usuario
        // =====================

        login: ({user, access_token}) => {
            if (!access_token) return;
            set({
                isLoggedIn: true,
                user: {...user},
                access_token
            });
        },

        logout: () => {
            set({
                isLoggedIn: false,
                user: usuarioVacio,
                access_token: null,
                cart: []
            });
        },

        checkTokenValidity: () => {
            const access_token = get().access_token;
            if (access_token) {
                try {
                    const tokenData = JSON.parse(atob(access_token.split('.')[1]));
                    const isExpired = tokenData.exp * 1000 < Date.now();
                    if (isExpired) {
                        get().logout();
                        console.log("Token expirado");
                    } else {
                        console.log("Token válido");
                    }
                } catch (err) {
                    console.error("Error al verificar el token:", err);
                    get().logout();
                }
            }
        },

        // =====================
        // 🛒 Carrito de compras
        // =====================

        addToCart: (producto) => {
            const cart = get().cart;
            const existingItem = cart.find(item => item.id === producto.id);

            if (existingItem) {
                const updatedCart = cart.map(item =>
                    item.id === producto.id
                        ? {...item, cantidad: item.cantidad + 1}
                        : item
                );
                set({cart: updatedCart});
            } else {
                set({cart: [...cart, {...producto, cantidad: 1}]});
            }
        },

        removeFromCart: (productId) => {
            const updatedCart = get().cart.filter(item => item.id !== productId);
            set({cart: updatedCart});
        },

        clearCart: () => {
            set({cart: []});
        },

        get totalItems() {
            return get().cart.reduce((acc, item) => acc + item.cantidad, 0);
        }

    }),
    {
        name: 'userStore',
        getStorage: () => sessionStorage,
    }));

export default useUserStore;

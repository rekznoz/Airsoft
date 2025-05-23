import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {actualizarToken} from "../services/UsuarioService.jsx";

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

        /**
         * Loguea al usuario
         * @param {{ user: object, access_token: string }} param0
         */
        login: ({user, access_token}) => {
            if (!access_token) return;
            console.log({user, access_token});
            set({
                isLoggedIn: true,
                user: {...user},
                access_token
            });
        },

        /**
         * Cierra la sesión del usuario
         */
        logout: () => {
            set({
                isLoggedIn: false,
                user: usuarioVacio,
                access_token: null
            });
        },

        /**
         * Valida si el token ha expirado
         */
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
                        //actualizarToken(access_token)
                    }
                } catch (err) {
                    console.error("Error al verificar el token:", err);
                    get().logout();
                }
            }
        },

    }),
    {
        name: 'userStore', // clave en localStorage
        getStorage: () => sessionStorage,
    }
));

export default useUserStore;

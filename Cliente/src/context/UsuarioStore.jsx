import {create} from 'zustand'
import {persist} from 'zustand/middleware'

const usuarioVacio = {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
}

/**
 * @typedef {import('zustand').UseBoundStore} UseBoundStore
 * @type {UseBoundStore<Mutate<StoreApi<{user: {id: number, name: string, email: string, email_verified_at: string, created_at: string, updated_at: string}, logueado: boolean, access_token: null, login: function({user: *, access_token: *}): void, logout: function(): void, checkTokenValidity: function(): void}>, [["zustand/persist", {user: {id: number, name: string, email: string, email_verified_at: string, created_at: string, updated_at: string}, logueado: boolean, access_token: null, login: function({user: *, access_token: *}): void, logout: function(): void, checkTokenValidity: function(): void}]]>>}
 * @description
 * Store para gestionar el estado del usuario en la aplicación.
 * Permite manejar el inicio de sesión, cierre de sesión y la validez del token de acceso.
 * @property {Object} user - Información del usuario autenticado.
 * @property {boolean} logueado - Indica si el usuario está autenticado.
 * @property {string|null} access_token - Token de acceso del usuario.
 * @property {function} login - Función para iniciar sesión del usuario.
 * @property {function} logout - Función para cerrar sesión del usuario.
 * @property {function} checkTokenValidity - Función para verificar la validez del token de acceso.
 * */
const usuarioStore = create(persist((set, get) => ({

        user: usuarioVacio,
        logueado: false,
        access_token: null,

        login: ({user, access_token}) => {
            if (!access_token) return
            set({
                logueado: true,
                user: {...user},
                access_token
            })
        },

        logout: () => {
            set({
                logueado: false,
                user: usuarioVacio,
                access_token: null,
            })
        },

        checkTokenValidity: () => {
            const access_token = get().access_token
            if (access_token) {
                try {
                    const tokenData = JSON.parse(atob(access_token.split('.')[1]))
                    const isExpired = tokenData.exp * 1000 < Date.now()
                    if (isExpired) {
                        get().logout()
                    }
                } catch (err) {
                    console.error("Error al verificar el token:", err)
                    get().logout()
                }
            }
        },

    }),
    {
        name: 'userStore',
        getStorage: () => sessionStorage,
    }))

export default usuarioStore

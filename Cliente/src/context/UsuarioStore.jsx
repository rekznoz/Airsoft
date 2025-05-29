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



const apiconfig = {
    productos: import.meta.env.VITE_API_PRODUCTOS_URL,
    auth: {
        login: import.meta.env.VITE_API_URL_AUTH,
        register: import.meta.env.VITE_API_URL_REGISTER,
        logout: import.meta.env.VITE_API_URL_LOGOUT,
        refresh: import.meta.env.VITE_API_URL_REFRESH
    },
}

export default apiconfig
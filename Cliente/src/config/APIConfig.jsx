/**
 * API configuration for the application.
 * @type {{productos: any, categorias: any, pedidos: any, comentarios: any, auth: {users: any, login: any, register: any, logout: any, refresh: any}}}
 */
const apiconfig = {
    productos: import.meta.env.VITE_API_PRODUCTOS_URL,
    categorias: import.meta.env.VITE_API_CATEGORIAS_URL,
    pedidos: import.meta.env.VITE_API_PEDIDOS_URL,
    comentarios: import.meta.env.VITE_API_COMENTARIOS_URL,
    auth: {
        users: import.meta.env.VITE_API_URL_USERS,
        login: import.meta.env.VITE_API_URL_AUTH,
        register: import.meta.env.VITE_API_URL_REGISTER,
        logout: import.meta.env.VITE_API_URL_LOGOUT,
        refresh: import.meta.env.VITE_API_URL_REFRESH
    },
}

export default apiconfig
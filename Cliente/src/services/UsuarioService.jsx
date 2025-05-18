import apiconfig from "../config/APIConfig.jsx";


/**
 * Obtiene un usuario autenticado con el email y password
 * @param email
 * @param password
 * @returns {Promise<any>}
 */
export const getUsuarioAuth = async (email, password) => {
    if (!email || !password) throw new Error("El email y password son requeridos");

    const res = await fetch(apiconfig.auth.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });

    return await res.json();

};

/**
 * Registra un usuario con el nombre, email, password y password_confirmation
 * @param name
 * @param email
 * @param password
 * @param password_confirmation
 * @returns {Promise<any>}
 */
export const registerUsuarioAuth = async (name, email, password, password_confirmation) => {

    console.log({ name, email, password, password_confirmation });

    if (!name || !email || !password || !password_confirmation) {
        throw new Error("Todos los campos son requeridos");
    }

    try {
        // Realizar la solicitud POST
        const res = await fetch(apiconfig.auth.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, password_confirmation }),
        });

        if (!res.ok) {
            console.error(res);
            return
        }

        // Devolver los datos de la respuesta si todo es correcto
        return await res.json();

    } catch (error) {
        // Manejar cualquier error en la solicitud
        console.error('Error en el registro:', error.message);
        throw new Error('Hubo un problema al intentar registrarte. Intenta nuevamente más tarde.');
    }
};

/**
 * Cierra la sesión de un usuario autenticado
 * @returns {Promise<void>}
 */
export const logoutAuth = async () => {
    try {
        const token = userStore().access_token;

        if (!token) {
            console.error('No token found');
            return
        }

        const res = await fetch(apiconfig.auth.logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data.message || 'Error during logout');
            return
        }
        console.log('Logout successful:', data);
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};

/**
 * Actualiza el token de un usuario autenticado
 * @param access_token
 * @returns {Promise<void>}
 */
export const actualizarToken = async (access_token) => {
    try {
        if (!access_token) {
            console.error('No token found');
            return
        }

        const res = await fetch(apiconfig.auth.refresh, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data.message || 'Error during token refresh');
            return
        }

        console.log('Token refreshed:', data);
        userStore().login(data);
    } catch (error) {
        console.error('Error during token refresh:', error.message);
    }
}
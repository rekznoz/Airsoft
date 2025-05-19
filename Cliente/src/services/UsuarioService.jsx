import apiconfig from "../config/APIConfig.jsx";
import useUserStore from "../context/AuthC.jsx";

/*
{
	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjk5LjE1LjUzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ3NTk3NDY2LCJleHAiOjE3NDc2MDEwNjYsIm5iZiI6MTc0NzU5NzQ2NiwianRpIjoiYjluTEhOWE9zajlSVXd2SCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.UKU28R4T0fkB78AC-Pn4lAaYVw24ujZVhSAri0XyfRQ",
	"token_type": "bearer",
	"expires_in": 3600,
	"user": {
		"id": 1,
		"name": "Admin",
		"email": "admin@admin.com",
		"roles": [
			"admin"
		],
		"permissions": [
			"agregar producto",
			"editar producto",
			"eliminar producto",
			"agregar categoria",
			"editar categoria",
			"eliminar categoria",
			"agregar pedido",
			"editar pedido",
			"eliminar pedido",
			"agregar comentario",
			"editar comentario",
			"eliminar comentario"
		]
	}
}
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

    const data = await res.json();

    if (!res.ok) {
        return { error: data.error || 'Error desconocido', status: res.status };
    }

    return data;

};

export const registerUsuarioAuth = async (name, email, password, password_confirmation) => {
    console.log({ name, email, password, password_confirmation });

    if (!name || !email || !password || !password_confirmation) {
        throw new Error("Todos los campos son requeridos");
    }

    try {
        console.log('Intentando registrar usuario...');

        const res = await fetch(apiconfig.auth.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, password_confirmation }),
        });

        const data = await res.json(); // Siempre intenta leer la respuesta

        if (!res.ok) {
            throw new Error(data.message || 'Error en el registro. Revisa los campos.');
        }

        return data;

    } catch (error) {
        console.error('Error en el registro:', error.message);
        throw new Error(error.message || 'Hubo un problema al intentar registrarte. Intenta nuevamente más tarde.');
    }
};


export const logoutAuth = async (token) => {
    try {

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
        useUserStore.getState().logout();
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};

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
    } catch (error) {
        console.error('Error during token refresh:', error.message);
    }
}
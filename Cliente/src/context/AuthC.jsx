import {create} from 'zustand';
import {loguearUsuario} from '../config/AuthService';
import Swal from "sweetalert2";

const useAuthStore = create((set) => ({

    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),

    login: async (credentials) => {
        try {
            const usuario = await loguearUsuario(credentials);
            set({user: usuario, isAuthenticated: true});
            localStorage.setItem('user', JSON.stringify(usuario));
            return true;
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return false;
        }
    },

    logout: () => {
        set({user: null, isAuthenticated: false});
        localStorage.removeItem('user');
    }

}));


export default useAuthStore;
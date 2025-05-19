import {create} from 'zustand';
import Swal from "sweetalert2";

const usuarioVacio = {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: ""
}

const useAuthStore = create((set) => ({

}));

export default useAuthStore;
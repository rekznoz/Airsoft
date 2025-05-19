// Recoge los datos del formulario
import {Formik} from 'formik'
// https://formik.org/docs/overview

// Validar los datos del formulario con Yup
import {bool, object, string} from 'yup'
import Swal from "sweetalert2"
import {Link} from "react-router-dom"

import "../css/registro.css"
import {registerUsuarioAuth} from "../services/UsuarioService.jsx";
import useUserStore from "../context/AuthC.jsx";

/*
{
	"name": "Rafa",
	"email":"admin21@admin.com",
	"password": "12345678",
	"password_confirmation": "12345678"
}
*/

const validationSchema = object({
    name: string()
        .required('El campo nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(20, 'El nombre debe tener como máximo 20 caracteres')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
    email: string()
        .required('El campo email es obligatorio')
        .email('El email no es válido'),
    password: string()
        .required('El campo contraseña es obligatorio')
        .min(8, 'La contraseña debe tener al menos 6 caracteres')
        .max(20, 'La contraseña debe tener como máximo 20 caracteres'),
    terminos: bool()
        .oneOf([true], 'Debes aceptar los términos y condiciones')
})

const usuarioVacio = {
    email: '',
    password: '',
    terminos: false
}

export default function Registro() {

    const handleSubmit = async (values) => {
        try {
            const {name, email, password, password_confirmation} = values
            const res = await registerUsuarioAuth(name, email, password, password_confirmation)

            console.log(res)

            useUserStore.getState().login({
                user: res.user,
                access_token: res.access_token
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al iniciar sesión',
            })
        }

    }

    return (
        <div className="registro-contenedor">
            <h1>Registrar Usuario</h1>
            <Formik
                initialValues={usuarioVacio}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && <div className="error">{errors.name}</div>}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && <div className="error">{errors.password}</div>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password_confirmation}
                            />
                            {errors.password_confirmation && touched.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                        </div>

                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="terminos"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.terminos}
                                />
                                Acepto los términos y condiciones
                            </label>
                            {errors.terminos && touched.terminos && <div className="error">{errors.terminos}</div>}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                )}
            </Formik>

            {/* Enlace para registrarse */}
            <p>¿Ya tienes tienes cuenta? <Link to="/login">Inicia sesion aquí</Link></p>

        </div>
    )
}
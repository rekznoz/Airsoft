// Recoge los datos del formulario
import {Formik} from 'formik'
// https://formik.org/docs/overview

// Validar los datos del formulario con Yup
import {object, string} from 'yup'
import Swal from "sweetalert2"
import {Link} from "react-router-dom"

import "../css/login.css"
import {getUsuarioAuth} from "../services/UsuarioService.jsx"
import useUserStore from "../context/AuthC.jsx"

const validationSchema = object({
    email: string()
        .required('El campo email es obligatorio')
        .email('El email no es válido'),
    password: string()
        .required('El campo contraseña es obligatorio')
        .min(8, 'La contraseña debe tener al menos 6 caracteres')
        .max(20, 'La contraseña debe tener como máximo 20 caracteres'),
})

const usuarioVacio = {
    email: '',
    password: '',
}

export default function Login() {

    const handleSubmit = async (values) => {
        try {
            const {email, password} = values
            const res = await getUsuarioAuth(email, password)

            //console.log(res)

            if (res.error) {
                if (res.status === 401) {
                    throw new Error('Email o contraseña incorrectos')
                }
                throw new Error(res.error)
            }

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
        <div className="login-contenedor">
            <h1>Iniciar Sesión</h1>
            <Formik
                initialValues={usuarioVacio}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                )}
            </Formik>

            {/* Enlace para registrarse */}
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>

        </div>
    )
}
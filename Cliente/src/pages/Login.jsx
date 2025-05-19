// Recoge los datos del formulario
import {Formik} from 'formik'
// https://formik.org/docs/overview

// Validar los datos del formulario con Yup
import {bool, object, string} from 'yup'
import Swal from "sweetalert2"
import {Link} from "react-router-dom"

import "../css/login.css"

const validationSchema = object({
    email: string()
        .required('El campo email es obligatorio')
        .email('El email no es válido'),
    password: string()
        .required('El campo contraseña es obligatorio')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(20, 'La contraseña debe tener como máximo 20 caracteres'),
    terminos: bool()
        .oneOf([true], 'Debes aceptar los términos y condiciones')
})

const usuarioVacio = {
    email: '',
    password: '',
    terminos: false
}

export default function Login() {

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            // const res = await loginAPI(values)
            // if (!res.ok) throw new Error('Credenciales inválidas')

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido ${values.email}`,
                showConfirmButton: false,
                timer: 1500
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
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>

        </div>
    )
}
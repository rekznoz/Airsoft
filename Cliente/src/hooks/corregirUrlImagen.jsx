/**
 * Corrección de URL de imagen
 * @param url
 * @returns {*|string}
 * @description Esta función toma una URL de imagen y la corrige para que use el protocolo HTTPS y el puerto 8443.
 * @param {string} url - La URL de la imagen a corregir.
 */
export function corregirUrlImagen(url) {
    try {
        const urlObj = new URL(url)
        urlObj.port = '8443'
        urlObj.protocol = 'https:'
        return urlObj.toString()
    } catch (e) {
        return url
    }
}
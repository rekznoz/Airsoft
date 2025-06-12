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
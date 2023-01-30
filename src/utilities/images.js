export const checkIfValidImage = (url = '') => {
    return /\.(jpg|jpeg|png|webp|bmp)$/.test(url)
}
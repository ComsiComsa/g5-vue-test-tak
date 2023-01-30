export const setCookie = (name, value, minutes = 5) => {
    let error
    const now = new Date()
    now.setMinutes(new Date().getMinutes() + minutes)

    try {
        document.cookie = `${name}=${value};expires=${now.toUTCString()}`
    } catch (e) {
        error = e
    }

    return error
}

export const getCookie = (name) => {
    const cookies = document.cookie.split(';')

    for (const cookie of cookies) {
        const [key, value] = cookie.split('=')

        if (key.trim() === name) {
            return JSON.parse(value)
        }
    }

    return null
}
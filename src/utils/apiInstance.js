import axios from 'axios'

export const apiInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_BASE_URL_TMDB_API,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_TOKEN_TMDB_API}`
        }
    }
)

export const apiInstanceExpress = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_EXPRESS,
    headers: {
        "Content-Type": "application/json"
    }
})

// ✅ Tambahkan interceptor untuk otomatis kirim token Firebase
apiInstanceExpress.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('jotai/tokenStorageAtom')) // sesuaikan jika pakai sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
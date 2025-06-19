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
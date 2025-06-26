import { apiInstance } from "./apiInstance"

export const getVideoUrl = async ({ movie_id }) => {
    try {
        let url = await apiInstance.get(`movie/${movie_id}/videos`)
        return url.data.results[0].key
    } catch (error) {
        console.log(error)
    }
}

export const getVideoUrlTV = async ({ moviesTypeTrending, movieId }) => {
    try {
        const url = await apiInstance.get(`${moviesTypeTrending}/${movieId}/videos`)
        return url.data.results[0].key
    } catch (error) {
        console.log(error)
    }
}
import { apiInstance } from "./apiInstance"

export const getMovieDetail = async ({ movie_id }) => {
    try {
        let movie = await apiInstance.get(`movie/${movie_id}`)
        return movie.data
    } catch (error) {
        console.log(error)
    }
}

export const getMovieDetailTrending = async ({ moviesTypeTrending, movie_id }) => {
    try {
        let movie = await apiInstance.get(`${moviesTypeTrending}/${movie_id}`)
        return movie.data
    } catch (error) {
        console.log(error)
    }
}
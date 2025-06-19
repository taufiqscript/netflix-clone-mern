import { apiInstance } from "./apiInstance"

export const getMoviesRecommendation = async ({ movie_id }) => {
    try {
        const movies = await apiInstance.get(`movie/${movie_id}/recommendations`)
        return movies.data.results
    } catch (error) {
        console.log(error)
    }
}

export const getMoviesRecommendationTrending = async ({ moviesTypeTrending, movie_id }) => {
    try {
        const movies = await apiInstance.get(`${moviesTypeTrending}/${movie_id}/recommendations`)
        return movies.data.results
    } catch (error) {
        console.log(error)
    }
}
import { apiInstance } from "./apiInstance"

export const searchMovies = async ({ query }) => {
    try {
        const key = await apiInstance.get(`search/movie?query=${query}`)
        return key.data.results
    } catch (error) {
        console.log(error)
    }
}

export const searchMoviesTrending = async ({ moviesTypeTrending, query }) => {
    try {
        const key = await apiInstance.get(`search/${moviesTypeTrending}?query=${query}`)
        return key.data.results
    } catch (error) {
        console.log(error)
    }
} 
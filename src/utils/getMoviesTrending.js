import { apiInstance } from './apiInstance'

export const getMoviesTrending = async ({ moviesTypeTrending, timeWindow }) => {
    try {
        const movies = await apiInstance.get(`trending/${moviesTypeTrending}/${timeWindow}`)
        return movies.data.results
    } catch (error) {
        console.log(error)
    }
}


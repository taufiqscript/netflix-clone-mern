import { apiInstanceExpress } from "./apiInstance"

export const checkFavoriteMovie = async ({ emailStorage, tokenStorage, idMovie }) => {
    try {
        const isFavorited = await apiInstanceExpress.post("my-movies/check", {
            email: emailStorage,
            token: tokenStorage,
            movieID: idMovie
        })
        return isFavorited.data.data.isFavorited
    } catch (error) {
        console.log(error)
    }
}

export const checkFavoriteMovieTrending = async ({ emailStorage, tokenStorage, idMovieTrending }) => {
    try {
        const isFavorited = await apiInstanceExpress.post("my-movies/check", {
            email: emailStorage,
            token: tokenStorage,
            movieID: idMovieTrending
        })
        return isFavorited.data.data.isFavorited
    } catch (error) {
        console.log(error)
    }
}
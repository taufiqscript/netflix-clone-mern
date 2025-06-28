import { useEffect, useState } from 'react'
import EachUtils from '../../../../utils/EachUtils'
import MovieCard from '../MovieCard'
import CarouselLayout from '../../../layouts/CarouselLayout'
import { getMoviesByType } from '../../../../utils/getMoviesByType'
import Notify from '../../Notify'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getMoviesTrending } from '../../../../utils/getMoviesTrending'
import { useAtom } from 'jotai'
import { emailStorageAtom, moviesTypeStateStorage, moviesTypeTrendingStorage, refreshFetchAtom, tokenStorageAtom } from '../../../../jotai/atoms'
import { apiInstanceExpress } from '../../../../utils/apiInstance'

const MovieList = ({ title, moviesType }) => {
    const { moviesTypeTrending, timeWindow, moviesTypeUrl } = useParams()
    const url = useLocation()
    const navigate = useNavigate()

    const [refreshFetch, setRefreshFetch] = useAtom(refreshFetchAtom)

    const [moviesTypeStorage] = useAtom(moviesTypeTrendingStorage)
    const [moviesTypeState] = useAtom(moviesTypeStateStorage)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const [idMovie, setIdMovie] = useState(null)
    const [idMovieTrending, setIdMovieTrending] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [movieListTrending, setMovieListTrending] = useState([])
    const [notifMessage, setNotifMessage] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [moviesFavorite, setMoviesFavorite] = useState([])

    const getFavoriteMovies = async () => {
        try {
            if (!emailStorage && !tokenStorage) return;
            const url = `my-movies/${emailStorage}/${tokenStorage}`
            const movies = await apiInstanceExpress.get(url)
            if (movies.status === 200) return movies.data.data.favoriteMovies
        } catch (error) {
            console.log(error)
        }
    }

    {
        url.pathname === `/favorite` &&
            useEffect(() => {
                if (emailStorage && tokenStorage)
                    getFavoriteMovies().then(result => setMoviesFavorite(result))
            }, [emailStorage, tokenStorage, refreshFetch])
    }

    {
        url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}` ?
            useEffect(() => {
                if (moviesTypeTrending && timeWindow) {
                    getMoviesTrending({ moviesTypeTrending, timeWindow }).then(result => setMovieListTrending(result))
                }
            }, [moviesTypeTrending, timeWindow])
            :
            useEffect(() => {
                if (moviesType) {
                    getMoviesByType({ moviesType }).then(result => setMovieList(result))
                }
            }, [moviesType])
    }

    {
        url.pathname === `/movie/${moviesTypeUrl}` &&
            useEffect(() => {
                if (moviesTypeUrl) {
                    getMoviesByType({ moviesType: moviesTypeUrl }).then(result => setMovieList(result))
                }
            }, [moviesTypeUrl])
    }

    if (url.pathname === `/favorite`) {
        return (
            <div className="pt-24 px-4">
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <h3 className="text-xl sm:text-4xl text-white font-semibold">My favorite Movies</h3>
                {moviesFavorite?.length === 0 && <p className="italic">saat ini tidak ada movie favorite...</p>}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    <EachUtils
                        of={moviesFavorite}
                        render={(item, index) => (
                            <div
                                className='h-40 sm:h-72 w-full mt-4'
                                key={index}
                            >
                                <MovieCard
                                    data={item}
                                    setIsHover={setIsHover}
                                    isHover={isHover}
                                    idMovie={idMovie}
                                    idMovieTrending={idMovieTrending}
                                    setIdMovie={setIdMovie}
                                    setIdMovieTrending={setIdMovieTrending}
                                    setNotifMessage={setNotifMessage}
                                    setIsSubmit={setIsSubmit}
                                />
                            </div>
                        )}
                    />
                </div>
            </div>
        )
    } else if (url.pathname === `/movie/${moviesTypeUrl}`) {
        return (
            <div>
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <h3 className='text-2xl sm:text-3xl font-semibold text-white mb-2'>{moviesTypeState} Movies</h3>
                <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                    <EachUtils
                        of={movieList}
                        render={(item, index) => (
                            <div
                                className='h-40 sm:h-72 w-full mt-4'
                                key={index}
                                onMouseLeave={() => {
                                    setIsHover(false)
                                    setIdMovie(null)
                                }}
                            >
                                <MovieCard
                                    data={item}
                                    setIsHover={setIsHover}
                                    isHover={isHover}
                                    idMovie={idMovie}
                                    setIdMovie={setIdMovie}
                                    moviesType={moviesType}
                                    setNotifMessage={setNotifMessage}
                                    setIsSubmit={setIsSubmit}
                                />
                            </div>
                        )}
                    />
                </div>
            </div>
        )
    } else if (url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}`) {
        return (
            <div>
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <div className="flex gap-2 sm:gap-4 items-center">
                    <h3 className="text-white text-2xl sm:text-4xl font-semibold">{moviesTypeStorage}</h3>
                    <div>
                        <ul className="flex items-center text-black font-semibold">
                            <li
                                onClick={() => navigate(`/trending/${moviesTypeTrending}/day`)}
                                className={`p-1 sm:px-2 sm:py-1 rounded-l-md cursor-pointer transition-all flex items-center gap-0.5 text-sm sm:text-lg ${url.pathname === `/trending/${moviesTypeTrending}/day` ? "bg-red-600 text-white scale-105" : "bg-white"}`}>
                                Today
                                {url.pathname === `/trending/${moviesTypeTrending}/day` && <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-6">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                </div>}
                            </li>
                            <li
                                onClick={() => navigate(`/trending/${moviesTypeTrending}/week`)}
                                className={`w-auto p-1 sm:px-2 sm:py-1 rounded-r-md cursor-pointer transition-all flex gap-0.5 items-center text-sm sm:text-lg ${url.pathname === `/trending/${moviesTypeTrending}/week` ? "bg-red-600 text-white scale-105" : "bg-white"}`}>
                                This Week
                                {url.pathname === `/trending/${moviesTypeTrending}/week` && <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-6">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                </div>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                    <EachUtils
                        of={movieListTrending}
                        render={(item, index) => (
                            <div
                                className='h-40 sm:h-72 w-full mt-4'
                                key={index}
                            >
                                <MovieCard
                                    data={item}
                                    setIsHover={setIsHover}
                                    isHover={isHover}
                                    idMovieTrending={idMovieTrending}
                                    setIdMovieTrending={setIdMovieTrending}
                                    moviesTypeTrending={moviesTypeTrending}
                                    timeWindow={timeWindow}
                                    setNotifMessage={setNotifMessage}
                                    setIsSubmit={setIsSubmit}
                                />
                            </div>
                        )}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="relative px-4">
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <h3 className='text-xl sm:text-3xl text-white font-bold'>{title}</h3>
                <CarouselLayout>
                    <EachUtils
                        of={movieList}
                        render={(item, index) => (
                            <div
                                className='carousel-item h-40 sm:h-72 w-1/3 sm:w-1/4 mt-4'
                                key={index}
                            >
                                <MovieCard
                                    data={item}
                                    setIsHover={setIsHover}
                                    isHover={isHover}
                                    idMovie={idMovie}
                                    setIdMovie={setIdMovie}
                                    moviesType={moviesType}
                                    setNotifMessage={setNotifMessage}
                                    setIsSubmit={setIsSubmit}
                                />
                            </div>
                        )}
                    />
                </CarouselLayout>
            </div>
        )
    }
}

export default MovieList
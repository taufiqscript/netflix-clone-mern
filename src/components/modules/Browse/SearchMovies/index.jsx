import { useEffect, useState } from 'react'
import EachUtils from '../../../../utils/EachUtils'
import MovieCard from '../MovieCard'
import { searchMovies, searchMoviesTrending } from '../../../../utils/searchMovies'
import { useAtom } from 'jotai'
import { searchMoviesAtom } from '../../../../jotai/atoms'
import Notify from '../../Notify'
import { useLocation, useParams } from 'react-router-dom'

const SearchMovies = () => {
    const { moviesTypeTrending, timeWindow } = useParams()
    const url = useLocation()

    const [idMovie, setIdMovie] = useState(null)
    const [idMovieTrending, setIdMovieTrending] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [movieListTrending, setMovieListTrending] = useState([])
    const [notifMessage, setNotifMessage] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)

    const [query] = useAtom(searchMoviesAtom)


    if (url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}`) {
        useEffect(() => {
            if (!query) return
            searchMoviesTrending({ moviesTypeTrending, query }).then(result => setMovieListTrending(result))
        }, [query])
    } else {
        useEffect(() => {
            if (!query) return
            searchMovies({ query }).then(result => setMovieList(result))
        }, [query])
    }

    return (
        <div className='grid grid-cols-3 sm:grid-cols-4 w-full gap-4 px-4 pt-14 sm:pt-24'>
            {isSubmit && <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                setNotifMessage(null)
                setIsSubmit(false)
            }} />}
            <EachUtils
                of={url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}` ? movieListTrending : movieList}
                render={(item, index) => (
                    <div
                        className='py-4 h-40 sm:h-72'
                        key={index}
                    ><MovieCard
                            data={item}
                            setIsHover={setIsHover}
                            isHover={isHover}
                            idMovie={idMovie}
                            idMovieTrending={idMovieTrending}
                            setIdMovieTrending={setIdMovieTrending}
                            setIdMovie={setIdMovie}
                            setNotifMessage={setNotifMessage}
                            setIsSubmit={setIsSubmit}
                            moviesTypeTrending={moviesTypeTrending}
                            timeWindow={timeWindow}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export default SearchMovies
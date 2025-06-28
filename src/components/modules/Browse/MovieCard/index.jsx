import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'
import { GoChevronDown, GoPlay, GoPlusCircle, GoTrash } from 'react-icons/go'
import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieDetailAtom, idMovieDetailTrendingAtom, isFetchingAtom, isOpenModalAtom, refreshFetchAtom, saveMovieDataAtom, sourcePathAtom, tokenStorageAtom } from '../../../../jotai/atoms'
import { useEffect, useState } from 'react'
import { getVideoUrl, getVideoUrlTV } from '../../../../utils/getVideoUrl'
import Skeleton from './Skeleton'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiInstanceExpress } from '../../../../utils/apiInstance'
import { checkFavoriteMovie, checkFavoriteMovieTrending } from '../../../../utils/checkFavoriteMovie'
import { parseTrendingPath } from '../../../../utils/parseTrendingPath'

const MovieCard = ({ data, setIsHover, isHover, idMovie, idMovieTrending, setIdMovieTrending, setIdMovie, moviesType, moviesTypeTrending, timeWindow, setNotifMessage, setIsSubmit }) => {
    const navigate = useNavigate()
    const url = useLocation()

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [, setIdMovieDetail] = useAtom(idMovieDetailAtom)
    const [, setIdMovieDetailTrending] = useAtom(idMovieDetailTrendingAtom)
    const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
    const [, setSourcePath] = useAtom(sourcePathAtom)
    const [, setData] = useAtom(saveMovieDataAtom)
    const [, setRefreshFetch] = useAtom(refreshFetchAtom)

    const [videoUrl, setVideoUrl] = useState(null)
    const [videoUrlTrending, setVideoUrlTrending] = useState(null)
    const [movieTypeState, setMoviesTypeState] = useState(null)
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        getIsFetching()
    }, [])

    const handleAddFavoriteMovie = async () => {
        try {
            setIsSubmit(true)
            if (!emailStorage && !tokenStorage) return;
            const addMovie = await apiInstanceExpress.post('my-movies', {
                email: emailStorage,
                token: tokenStorage,
                data: {
                    ...data,
                    addedFrom: url.pathname
                }
            })
            if (addMovie.status !== 201) return setNotifMessage(`Film ${!data.title ? data.name : data.title} gagal ditambahkan!`)
            setNotifMessage(`Film ${!data.title ? data.name : data.title} berhasil ditambahkan`)
            setIsFavorited(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveFavoriteMovie = async () => {
        try {
            setIsSubmit(true)
            if (!emailStorage && !tokenStorage) return;
            const removeMovie = await apiInstanceExpress.delete("my-movies", {
                data: {
                    email: emailStorage,
                    token: tokenStorage,
                    movieID: data.id
                }
            })
            if (removeMovie.status !== 204) return setNotifMessage(`Film ${!data.title ? data.name : data.title} gagal dihapus`)
            setNotifMessage(`Film ${!data.title ? data.name : data.title} berhasil dihapus dari list favorite`)
            setIsFavorited(false)
            setRefreshFetch(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    const getIsFetching = () => {
        setIsFetching(true)
        setTimeout(() => {
            setIsFetching(false)
        }, 500)
    }

    const getSourceType = (addedFrom) => {
        if (!addedFrom) return "unknown"
        if (addedFrom === "/browse") return "browse"
        if (addedFrom.startsWith("/trending/")) return "trending"
        if (addedFrom.startsWith("/movie/")) return "movie"
        return "other"
    }

    const sourceType = getSourceType(data.addedFrom)
    const trendingPath = parseTrendingPath(data.addedFrom)

    if (isFetching) return <Skeleton />

    const handleTitle = (text, maxWord) => {
        if (!text) return ""
        const word = text.split(" ")
        if (word.length <= maxWord) return text
        return word.slice(0, maxWord).join(" ") + "..."
    }

    if (url.pathname === `/favorite`) {
        return (
            <>
                <div
                    className='relative w-full h-40 sm:h-72 overflow-hidden rounded-md'
                    onMouseEnter={() => {
                        setIsHover(true)
                        if (sourceType === "trending" && trendingPath) {
                            setIdMovieTrending(data.id)
                            getVideoUrlTV({ moviesTypeTrending: trendingPath, movieId: data.id }).then(result => setVideoUrlTrending(result))
                            checkFavoriteMovieTrending({ emailStorage, tokenStorage, idMovieTrending: data.id }).then(result => setIsFavorited(result))
                        } else if (sourceType === "browse" || sourceType === "movie") {
                            setIdMovie(data.id)
                            getVideoUrl({ movie_id: data.id }).then(result => setVideoUrl(result))
                            checkFavoriteMovie({ emailStorage, tokenStorage, idMovie: data.id }).then(result => setIsFavorited(result))
                        }
                    }}
                    onMouseLeave={() => {
                        setIsHover(false)
                        setIdMovie(null)
                        setIdMovieTrending(null)
                    }}
                >
                    < img
                        src={import.meta.env.VITE_IMAGE_URL_TMDB_API + data.poster_path}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity rounded-md z-10 ${(isHover && (idMovie === data.id || idMovieTrending === data.id)) ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {isHover && (idMovie == data.id || idMovieTrending === data.id) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ ease: "easeInOut", duration: 0 }}
                            className='absolute top-0 left-0 w-full h-full'
                        >
                            <div className='relative hover:scale-102 z-20 transition-all h-[85px] sm:h-[180px]'>
                                <ReactPlayer
                                    url={`https://youtube.com/watch?v=${videoUrl || videoUrlTrending}`}
                                    playing={isHover}
                                    muted={true}
                                    width={"100%"}
                                    height={"100%"}
                                    controls={false}
                                    loop={true}
                                />
                            </div>
                            <div className='relative max-h-48 h-[60%] sm:h-[40%] bg-[#141414] p-1 sm:p-2 rounded-b-md z-10 hover:z-40 overflow-y-scroll'>
                                <section>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-1.5'>
                                            <button
                                                onClick={() => navigate(`/watch/${videoUrl || videoUrlTrending}`)}
                                                className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                                <GoPlay className='text-[18px] sm:text-[24px]' />
                                            </button>
                                            <button
                                                onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                                className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                                {isFavorited ? <GoTrash className='text-[18px] sm:text-[24px]' /> : <GoPlusCircle className='text-[18px] sm:text-[24px]' />}
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    setIsOpenModal(true)
                                                    setIdMovieDetail(data.id)
                                                    setIdMovieDetailTrending(data.id)
                                                    setSourcePath?.(data.addedFrom)
                                                    setData(data)
                                                }}
                                                className='border rounded-full border-2 cursor-pointer text-white hover:text-gray-300 transition-all'>
                                                <GoChevronDown className='text-[12px] sm:text-[18px]' />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-xs sm:text-2xl font-semibold text-white'>{!data.title ? handleTitle(data.name, 3) : handleTitle(data.title, 3)}</h3>
                                        <p className='text-yellow-400 text-[10px]'>Popularity : <span className='text-yellow-400'>{data.popularity}</span>
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </motion.div>
                    )}
                </div>
            </>
        )
    } else if (url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}`) {
        return (
            <div
                className='relative w-full h-40 sm:h-72 overflow-hidden rounded-md'
                onMouseEnter={() => {
                    setIsHover(true)
                    setIdMovieTrending(data.id)
                    getVideoUrlTV({ moviesTypeTrending, movieId: data.id }).then(result => setVideoUrlTrending(result))
                    checkFavoriteMovieTrending({ emailStorage, tokenStorage, idMovieTrending: data.id }).then(result => setIsFavorited(result))
                }}
                onMouseLeave={() => {
                    setIsHover(false)
                    setIdMovieTrending(null)
                }}
            >
                < img
                    src={import.meta.env.VITE_IMAGE_URL_TMDB_API + data.poster_path}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity rounded-md z-10 ${isHover && idMovieTrending === data.id ? 'opacity-0' : 'opacity-100'}`}

                />
                {isHover && idMovieTrending == data.id && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ ease: "easeInOut", duration: 0 }}
                        className='absolute top-0 left-0 w-full h-full'
                    >
                        <div className='relative hover:scale-102 z-20 transition-all h-[85px] sm:h-[180px]'>
                            {videoUrlTrending && (
                                <ReactPlayer
                                    url={`https://youtube.com/watch?v=${videoUrlTrending}`}
                                    playing={isHover}
                                    muted={true}
                                    width={"100%"}
                                    height={"100%"}
                                    controls={false}
                                    loop={true}
                                />
                            )}
                        </div>
                        <div className='relative max-h-48 h-[60%] sm:h-[40%] bg-[#141414] p-1 sm:p-2 rounded-b-md z-10 hover:z-40'>
                            <section>
                                <div className='flex justify-between'>
                                    <div className='flex gap-1.5'>
                                        <button
                                            onClick={() => navigate(`/watch/${videoUrlTrending}`)}
                                            className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            <GoPlay className='text-[18px] sm:text-[24px]' />
                                        </button>
                                        <button
                                            onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                            className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            {isFavorited ? <GoTrash className='text-[18px] sm:text-[24px]' /> : <GoPlusCircle className='text-[18px] sm:text-[24px]' />}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setIsOpenModal(true)
                                                setIdMovieDetailTrending(data.id)
                                                setData(data)
                                            }}
                                            className='border rounded-full border-2 cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            <GoChevronDown className='text-[12px] sm:text-[18px]' />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-xs sm:text-2xl font-semibold text-white'>{!data.title ? handleTitle(data.name, 3) : handleTitle(data.title, 3)}</h3>
                                    <p className='text-yellow-400 text-[10px] sm:text-lg'>Popularity : <span className='text-yellow-400'>{data.popularity}</span></p>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}
            </div>
        )
    } else {
        return (
            <div
                className='relative w-full h-40 sm:h-72 overflow-hidden rounded-md'
                onMouseEnter={() => {
                    setIsHover(true)
                    setIdMovie(data.id)
                    getVideoUrl({ movie_id: data.id }).then(result => setVideoUrl(result))
                    checkFavoriteMovie({ emailStorage, tokenStorage, idMovie: data.id }).then(result => setIsFavorited(result))
                    setMoviesTypeState(moviesType)
                }}
                onMouseLeave={() => {
                    setIsHover(false)
                    setIdMovie(null)
                }}
            >
                < img
                    src={import.meta.env.VITE_IMAGE_URL_TMDB_API + data.poster_path}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity rounded-md z-10 ${isHover && idMovie === data.id && moviesType === movieTypeState ? 'opacity-0' : 'opacity-100'}`}
                />
                {isHover && idMovie == data.id && moviesType === movieTypeState && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ ease: "easeInOut", duration: 0 }}
                        className='absolute top-0 left-0 w-full h-full'
                    >
                        <div className='relative hover:scale-102 z-20 transition-all h-[85px] sm:h-[180px]'>
                            {videoUrl && (
                                <ReactPlayer
                                    url={`https://youtube.com/watch?v=${videoUrl}`}
                                    playing={isHover}
                                    muted={true}
                                    width={"100%"}
                                    height={"100%"}
                                    controls={false}
                                    loop={true}
                                />
                            )}
                        </div>
                        <div className='relative max-h-48 h-[60%] sm:h-[40%] bg-[#141414] p-1 sm:p-2 rounded-b-md z-10 hover:z-40'>
                            <section>
                                <div className='flex justify-between'>
                                    <div className='flex gap-1.5'>
                                        <button
                                            onClick={() => navigate(`/watch/${videoUrl}`)}
                                            className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            <GoPlay className='text-[18px] sm:text-[24px]' />
                                        </button>
                                        <button
                                            onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                            className='cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            {isFavorited ? <GoTrash className='text-[18px] sm:text-[24px]' /> : <GoPlusCircle className='text-[18px] sm:text-[24px]' />}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setIsOpenModal(true)
                                                setIdMovieDetail(data.id)
                                                setData(data)
                                            }}
                                            className='border rounded-full border-2 cursor-pointer text-white hover:text-gray-300 transition-all'>
                                            <GoChevronDown className='text-[12px] sm:text-[18px]' />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-xs sm:text-2xl font-semibold text-white'>{!data.title ? handleTitle(data.name, 3) : handleTitle(data.title, 3)}</h3>
                                    <p className='text-yellow-400 text-[10px] sm:text-lg'>Popularity : <span className='text-yellow-400'>{data.popularity}</span></p>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}
            </div>
        )
    }
}

export default MovieCard
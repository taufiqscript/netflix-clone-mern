import { useAtom } from 'jotai'
import { emailStorageAtom, idMovieDetailAtom, idMovieDetailTrendingAtom, isOpenModalAtom, refreshFetchAtom, saveMovieDataAtom, sourcePathAtom, tokenStorageAtom } from '../../../../jotai/atoms'
import { GoPlay, GoPlusCircle, GoTrash } from 'react-icons/go'
import Recommendation from './Recommendation'
import { MdClose } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { getMovieDetail, getMovieDetailTrending } from '../../../../utils/getMovieDetail'
import { getVideoUrl, getVideoUrlTV } from '../../../../utils/getVideoUrl'
import ReactPlayer from 'react-player'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { parseTrendingPath } from '../../../../utils/parseTrendingPath'
import { checkFavoriteMovie, checkFavoriteMovieTrending } from '../../../../utils/checkFavoriteMovie'
import { apiInstanceExpress } from '../../../../utils/apiInstance'
import Notify from '../../Notify'

const Modal = () => {
    const { moviesTypeTrending, timeWindow } = useParams()

    const navigate = useNavigate()
    const url = useLocation()

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idMovieDetail, setIdMovieDetail] = useAtom(idMovieDetailAtom)
    const [idMovieDetailTrending, setIdMovieDetailTrending] = useAtom(idMovieDetailTrendingAtom)
    const [sourcePath, setSourcePath] = useAtom(sourcePathAtom)
    const [data, setData] = useAtom(saveMovieDataAtom)
    const [refreshFetch, setRefreshFetch] = useAtom(refreshFetchAtom)

    const [movieDetail, setMovieDetail] = useState([])
    const [movieDetailTrending, setMovieDetailTrending] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)
    const [videoUrlTrending, setVideoUrlTrending] = useState(null)
    const [isFavorited, setIsFavorited] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [notifMessage, setNotifMessage] = useState(null)

    const getSourceType = (addedFrom) => {
        if (!addedFrom) return "unknown"
        if (addedFrom === "/browse") return "browse"
        if (addedFrom.startsWith("/trending/")) return "trending"
        if (addedFrom.startsWith("/movie/")) return "movie"
        return "other"
    }

    const sourceType = getSourceType(sourcePath)
    const trendingPath = parseTrendingPath(sourcePath)

    const handleAddFavoriteMovie = async () => {
        try {
            setIsSubmit(true)
            if (!emailStorage && !tokenStorage && !data) return;
            const addMovie = await apiInstanceExpress.post('my-movies', {
                email: emailStorage,
                token: tokenStorage,
                data: {
                    ...data,
                    addedFrom: url.pathname
                }
            })
            if (addMovie.status !== 201) return setNotifMessage(`Film ${sourceType === "trending" ? movieDetailTrending?.title || movieDetailTrending?.name : movieDetail?.title || movieDetail?.name} gagal ditambahkan!`)
            setNotifMessage(`Film ${sourceType === "trending" ? movieDetailTrending?.title || movieDetailTrending?.name : movieDetail?.title || movieDetail?.name} berhasil ditambahkan`)
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
                    movieID: sourceType === "trending" ? idMovieDetailTrending : idMovieDetail
                }
            })
            if (removeMovie.status !== 204) return setNotifMessage(`Film ${sourceType === "trending" ? movieDetailTrending?.title || movieDetailTrending?.name : movieDetail?.title || movieDetail?.name} gagal dihapus`)
            setNotifMessage(`Film ${sourceType === "trending" ? movieDetailTrending?.title || movieDetailTrending?.name : movieDetail?.title || movieDetail?.name} berhasil dihapus dari list favorite`)
            setIsFavorited(false)
            setRefreshFetch(!refreshFetch)
        } catch (error) {
            console.log(error)
        }
    }


    {
        url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}` ?
            useEffect(() => {
                if (idMovieDetailTrending && isOpenModal) {
                    getMovieDetailTrending({ moviesTypeTrending, movie_id: idMovieDetailTrending }).then(result => setMovieDetailTrending(result))
                    getVideoUrlTV({ moviesTypeTrending, movieId: idMovieDetailTrending }).then(result => setVideoUrlTrending(result))
                    checkFavoriteMovieTrending({ emailStorage, tokenStorage, idMovieTrending: idMovieDetailTrending }).then(result => setIsFavorited(result))
                }
            }, [idMovieDetailTrending, isOpenModal, isFavorited])
            :
            useEffect(() => {
                if (idMovieDetail && isOpenModal) {
                    getMovieDetail({ movie_id: idMovieDetail }).then(result => setMovieDetail(result))
                    getVideoUrl({ movie_id: idMovieDetail }).then(result => setVideoUrl(result))
                    checkFavoriteMovie({ emailStorage, tokenStorage, idMovie: idMovieDetail }).then(result => setIsFavorited(result))
                }
            }, [idMovieDetail, isOpenModal, isFavorited])
    }

    {
        url.pathname === "/favorite" &&
            useEffect(() => {
                if (!isOpenModal && (!idMovieDetail || !idMovieDetailTrending || !sourceType || !trendingPath)) return

                if (sourceType === "trending" && trendingPath) {
                    getMovieDetailTrending({ moviesTypeTrending: trendingPath, movie_id: idMovieDetailTrending }).then(result => setMovieDetailTrending(result))
                    getVideoUrlTV({ moviesTypeTrending: trendingPath, movieId: idMovieDetailTrending }).then(result => setVideoUrlTrending(result))
                    checkFavoriteMovieTrending({ emailStorage, tokenStorage, idMovieTrending: idMovieDetailTrending }).then(result => setIsFavorited(result))
                } else if (sourceType === "browse" || sourceType === "movie") {
                    getMovieDetail({ movie_id: idMovieDetail }).then(result => setMovieDetail(result))
                    getVideoUrl({ movie_id: idMovieDetail }).then(result => setVideoUrl(result))
                    checkFavoriteMovie({ emailStorage, tokenStorage, idMovie: idMovieDetail }).then(result => setIsFavorited(result))
                }
            }, [isOpenModal, idMovieDetail, idMovieDetailTrending, sourceType, trendingPath, isFavorited, refreshFetch])
    }

    const genreMapping = (genres) => {
        return genres?.map(genre => genre.name).join(", ") || ""
    }

    const activeDetail = sourceType === "trending" ? movieDetailTrending : movieDetail

    if (url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}`) {
        return (
            <>
                <dialog className={`modal ${isOpenModal ? `modal-open` : ""}`}>
                    {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                        setNotifMessage(null)
                        setIsSubmit(false)
                    }} /> : null}
                    <div className='relative modal-box max-w-screen-md m-auto w-full max-h-screen-md p-0'>
                        <div className='relative'>
                            <div className='w-full h-[60vh] sm:h-[90vh]'>
                                {videoUrlTrending && (
                                    <ReactPlayer
                                        url={`https://youtube.com/watch?v=${videoUrlTrending}`}
                                        playing={true}
                                        muted={true}
                                        loop={true}
                                        controls={false}
                                        width={"100%"}
                                        height={"100%"}
                                    />
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpenModal(false)
                                    setIdMovieDetailTrending(null)
                                    setData(null)
                                }}
                                className='absolute top-2 right-2 text-md sm:text-xl text-white rounded-full hover:bg-red-500 p-1 transition-all'>
                                <MdClose />
                            </button>
                            <div className='absolute top-1/2 -translate-y-1/2 left-4 sm:left-8'>
                                <h3 className='text-xl sm:text-4xl max-w-48 sm:max-w-sm font-black text-white'>{!movieDetailTrending.title ? movieDetailTrending.name : movieDetailTrending.title}</h3>
                                <div className='flex gap-1 sm:gap-3 mt-2'>
                                    <button
                                        onClick={() => navigate(`/watch/${videoUrlTrending}`)}
                                        className='bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 flex gap-1 hover:bg-gray-300 transition-all text-sm sm:text-lg text-black font-bold rounded-xl items-center cursor-pointer'>
                                        <GoPlay className='text-[18px] sm:text-[24px]' />
                                        Play
                                    </button>
                                    <button
                                        onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                        className='text-white cursor-pointer hover:text-gray-200 transition-all'>
                                        {isFavorited ? <GoTrash className='text-[24px] sm:text-[32px]' /> : <GoPlusCircle className='text-[24px] sm:text-[32px]' />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 p-2 gap-4 text-sm sm:text-lg'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                    <p>{!movieDetailTrending.release_date ? movieDetailTrending.first_air_date : movieDetailTrending.release_date}</p>
                                    {movieDetailTrending.runtime ? (
                                        <p className='text-yellow-400'>{movieDetailTrending.runtime} minutes</p>
                                    ) : (
                                        <p className='text-yellow-400'>{movieDetailTrending.vote_average} vote</p>
                                    )}

                                </div>
                                <div>
                                    <p>{movieDetailTrending.overview}</p>
                                </div>
                            </div>
                            <div>
                                <p>{genreMapping(movieDetailTrending.genres)}</p>
                                <p className='text-yellow-400'>Popularity : {movieDetailTrending.popularity}</p>
                            </div>
                        </div>
                        <Recommendation />
                    </div>
                </dialog>
            </>
        )
    } else if (url.pathname === "/favorite") {
        return (
            <dialog className={`modal ${isOpenModal ? `modal-open` : ""}`}>
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <div className='relative modal-box max-w-screen-md m-auto w-full max-h-screen-md p-0'>
                    <div className='relative'>
                        <div className='w-full h-[60vh] sm:h-[90vh]'>
                            <ReactPlayer
                                url={`https://youtube.com/watch?v=${sourceType === "trending" && trendingPath ? videoUrlTrending : videoUrl}`}
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={false}
                                width={"100%"}
                                height={"100%"}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setIsOpenModal(false)
                                setIdMovieDetail(null)
                                setIdMovieDetailTrending(null)
                                setData(null)
                            }}
                            className='absolute top-2 right-2 text-md sm:text-xl text-white rounded-full hover:bg-red-500 p-1 transition-all'>
                            <MdClose />
                        </button>
                        <div className='absolute top-1/2 -translate-y-1/2 left-4 sm:left-8'>
                            <h3 className='text-xl sm:text-4xl max-w-48 sm:max-w-sm font-black text-white'>{sourceType === "trending" && trendingPath ? movieDetailTrending?.title || movieDetailTrending?.name : movieDetail?.title}</h3>
                            <div className='flex gap-1 sm:gap-3 mt-2'>
                                <button
                                    onClick={() => {
                                        navigate(`/watch/${sourceType === "trending" && trendingPath ? videoUrlTrending : videoUrl}`)
                                        setIsOpenModal(false)
                                        setIdMovieDetail(null)
                                        setIdMovieDetailTrending(null)
                                        setSourcePath(null)
                                    }}
                                    className='bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 flex gap-1 hover:bg-gray-300 transition-all text-black text-sm sm:text-lg font-bold rounded-xl items-center cursor-pointer'>
                                    <GoPlay className='text-[18px] sm:text-[24px]' />
                                    Play
                                </button>
                                <button
                                    onClick={isFavorited ? handleRemoveFavoriteMovie : null}
                                    className='text-white cursor-pointer hover:text-gray-200 transition-all'>
                                    {isFavorited ? <GoTrash className='text-[24px] sm:text-[32px]' /> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 p-2 gap-4 text-sm sm:text-lg'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <p>
                                    {activeDetail?.release_date || activeDetail?.first_air_date}
                                </p>
                                {activeDetail?.runtime
                                    ? (
                                        <p className='text-yellow-400 flex gap-1'>
                                            {activeDetail.runtime} minutes
                                        </p>
                                    )
                                    : activeDetail?.vote_average && (
                                        <p className='text-yellow-400 flex gap-1'>
                                            {activeDetail.vote_average} vote
                                        </p>
                                    )
                                }
                            </div>
                            <div>
                                <p>{sourceType === "trending" && trendingPath ? movieDetailTrending?.overview : movieDetail?.overview}</p>
                            </div>
                        </div>
                        <div>
                            <p>{genreMapping(sourceType === "trending" && trendingPath ? movieDetailTrending?.genres : movieDetail?.genres)}</p>
                            <p className='text-yellow-400'>Popularity : {sourceType === "trending" && trendingPath ? movieDetailTrending?.popularity : movieDetail?.popularity}</p>
                        </div>
                    </div>
                    <Recommendation />
                </div>
            </dialog>
        )
    } else {
        return (
            <dialog className={`modal ${isOpenModal ? `modal-open` : ""}`}>
                {isSubmit ? <Notify message={notifMessage} style={"toast-middle"} onClose={() => {
                    setNotifMessage(null)
                    setIsSubmit(false)
                }} /> : null}
                <div className='relative modal-box max-w-screen-md m-auto w-full max-h-screen-md p-0'>
                    <div className='relative'>
                        <div className='w-full h-[60vh] sm:h-[90vh]'>
                            {videoUrl && (
                                <ReactPlayer
                                    url={`https://youtube.com/watch?v=${videoUrl}`}
                                    playing={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setIsOpenModal(false)
                                setIdMovieDetail(null)
                                setData(null)
                            }}
                            className='absolute top-2 right-2 text-md sm:text-xl text-white rounded-full hover:bg-red-500 p-1 transition-all'>
                            <MdClose />
                        </button>
                        <div className='absolute top-1/2 -translate-y-1/2 left-4 sm:left-8'>
                            <h3 className='text-xl sm:text-4xl max-w-48 sm:max-w-sm font-black text-white'>{movieDetail.title}</h3>
                            <div className='flex gap-1 sm:gap-3 mt-2'>
                                <button
                                    onClick={() => navigate(`/watch/${videoUrl}`)}
                                    className='bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 flex gap-1 hover:bg-gray-300 transition-all text-black font-bold rounded-xl text-sm items-center cursor-pointer'>
                                    <GoPlay className='text-[18px] sm:text-24px' />
                                    Play
                                </button>
                                <button
                                    onClick={isFavorited ? handleRemoveFavoriteMovie : handleAddFavoriteMovie}
                                    className='text-white cursor-pointer hover:text-gray-200 transition-all'>
                                    {isFavorited ? <GoTrash className='text-[24px] sm:text-[32px]' /> : <GoPlusCircle className='text-[24px] sm:text-[32px]' />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 p-2 gap-4 text-sm sm:text-lg'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <p>{movieDetail.release_date}</p>
                                <p className='text-yellow-400'>{movieDetail.runtime} minutes</p>
                            </div>
                            <div>
                                <p>{movieDetail.overview}</p>
                            </div>
                        </div>
                        <div>
                            <p>{genreMapping(movieDetail.genres)}</p>
                            <p className='text-yellow-400'>Popularity : {movieDetail.popularity}</p>
                        </div>
                    </div>
                    <Recommendation />
                </div>
            </dialog>
        )
    }
}
export default Modal
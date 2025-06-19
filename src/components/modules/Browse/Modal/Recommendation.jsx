import { GoPlay } from 'react-icons/go'
import EachUtils from '../../../../utils/EachUtils'
import { useAtom } from 'jotai'
import { idMovieDetailAtom, idMovieDetailTrendingAtom, isOpenModalAtom, sourcePathAtom } from '../../../../jotai/atoms'
import { useEffect, useState } from 'react'
import { getMoviesRecommendation, getMoviesRecommendationTrending } from '../../../../utils/getMoviesRecommendation'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getVideoUrl, getVideoUrlTV } from '../../../../utils/getVideoUrl'
import { parseTrendingPath } from '../../../../utils/parseTrendingPath'


const Recommendation = () => {
    const { moviesTypeTrending, timeWindow } = useParams()
    const url = useLocation()
    const navigate = useNavigate()

    const [idMovieDetail, setIdMovieDetail] = useAtom(idMovieDetailAtom)
    const [idMovieDetailTrending, setIdMovieDetailTrending] = useAtom(idMovieDetailTrendingAtom)
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [sourcePath, setSourcePath] = useAtom(sourcePathAtom)

    const [moviesRecommendation, setMoviesRecommendation] = useState([])
    const [moviesRecommendationTrend, setMoviesRecommendationTrend] = useState([])
    const [videoUrl, setVideoUrl] = useState(null)
    const [videoUrlTrending, setVideoUrlTrending] = useState(null)

    const getSourceType = (addedFrom) => {
        if (!addedFrom) return "unknown"
        if (addedFrom === "/browse") return "browse"
        if (addedFrom.startsWith("/trending/")) return "trending"
        if (addedFrom.startsWith("/movie/")) return "movie"
        return "other"
    }

    const sourceType = getSourceType(sourcePath)
    const trendingPath = parseTrendingPath(sourcePath)

    {
        url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}` ?
            useEffect(() => {
                if (idMovieDetailTrending) {
                    getMoviesRecommendationTrending({ moviesTypeTrending, movie_id: idMovieDetailTrending }).then(result => setMoviesRecommendationTrend(result))
                }
            }, [idMovieDetailTrending])
            :
            useEffect(() => {
                if (idMovieDetail) {
                    getMoviesRecommendation({ movie_id: idMovieDetail }).then(result => setMoviesRecommendation(result))
                }
            }, [idMovieDetail])
    }

    {
        url.pathname === "/favorite" &&
            useEffect(() => {
                if (!idMovieDetail || !idMovieDetailTrending || !sourceType || !trendingPath) return

                if (sourceType === "trending" && trendingPath) {
                    getMoviesRecommendationTrending({ moviesTypeTrending: trendingPath, movie_id: idMovieDetailTrending }).then(result => setMoviesRecommendationTrend(result))
                    getVideoUrlTV({ moviesTypeTrending: trendingPath, movieId: idMovieDetailTrending }).then(result => setVideoUrlTrending(result))
                } else if (sourceType === "browse" || sourceType === "movie") {
                    getMoviesRecommendation({ movie_id: idMovieDetail }).then(result => setMoviesRecommendation(result))
                    getVideoUrl({ movie_id: idMovieDetail }).then(result => setVideoUrl(result))
                }
            }, [idMovieDetail, idMovieDetailTrending, sourceType, trendingPath])
    }

    if (url.pathname === "/favorite") {
        return (
            <div className="p-2">
                <h3 className="text-2xl font-bold text-white">Movies Recommendation</h3>
                <section className='grid grid-cols-3 gap-2 mt-4'>
                    <EachUtils
                        of={sourceType === "trending" ? moviesRecommendationTrend : moviesRecommendation}
                        render={(item, index) => (
                            <div
                                key={index}
                            >
                                <div
                                    className='relative'
                                >
                                    <img src={import.meta.env.VITE_IMAGE_URL_TMDB_API + item.poster_path}
                                        className='rounded-t-md h-52 w-full object-cover'
                                    />
                                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                        <button
                                            onMouseEnter={() => {
                                                if (sourceType === "trending" && trendingPath) {
                                                    getVideoUrlTV({ moviesTypeTrending: trendingPath, movieId: item.id }).then(result => setVideoUrlTrending(result))
                                                } else if (sourceType === "browse" || sourceType === "movie") {
                                                    getVideoUrl({ movie_id: item.id }).then(result => setVideoUrl(result))
                                                }
                                            }}
                                            onClick={() => {
                                                navigate(`/watch/${sourceType === "trending" ? videoUrlTrending : videoUrl}`)
                                                setIsOpenModal(false)
                                                setIdMovieDetailTrending(null)
                                                setIdMovieDetail(null)
                                                setSourcePath(null)
                                            }}
                                            className='text-white hover:text-gray-200 transition-all cursor-pointer'>
                                            <GoPlay size={44} />
                                        </button>
                                    </div>
                                </div>
                                <div className='bg-[#1e1e1e] h-full px-2 py-1 max-h-48 overflow-y-scroll rounded-b-md'>
                                    <div className='flex gap-2'>
                                        <p>{item?.release_date || item?.first_air_date}</p>
                                        {item?.runtime && <p className='text-yellow-400'>{item?.runtime} minutes</p>}
                                        {item?.vote_average && <p className='text-yellow-400'>{item?.vote_average} vote</p>}
                                    </div>
                                    <div>
                                        <p>{item?.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </section >
            </div >
        )
    } else if (url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}`) {
        return (
            <div className="p-2">
                <h3 className="text-2xl font-bold text-white">Movies Recommendation</h3>
                <section className='grid grid-cols-3 gap-2 mt-4'>
                    <EachUtils
                        of={moviesRecommendationTrend}
                        render={(item, index) => (
                            <div
                                key={index}
                            >
                                <div
                                    className='relative'
                                >
                                    <img src={import.meta.env.VITE_IMAGE_URL_TMDB_API + item.poster_path}
                                        className='rounded-t-md h-52 w-full object-cover'
                                    />
                                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                        <button
                                            onMouseEnter={() => {
                                                getVideoUrlTV({ moviesTypeTrending, movieId: item.id }).then(result => setVideoUrlTrending(result))
                                            }}
                                            onClick={() => {
                                                navigate(`/watch/${videoUrlTrending}`)
                                                setIsOpenModal(false)
                                                setIdMovieDetailTrending(null)
                                            }}
                                            className='text-white hover:text-gray-200 transition-all cursor-pointer'>
                                            <GoPlay size={44} />
                                        </button>
                                    </div>
                                </div>
                                <div className='bg-[#1e1e1e] h-full px-2 py-1 max-h-48 overflow-y-scroll rounded-b-md'>
                                    <div className='flex gap-2'>
                                        <p>{!item.release_date ? item.first_air_date : item.release_date}</p>
                                        {item.runtime && <p className='text-yellow-400'>{item.runtime} minutes</p>}
                                        {item.vote_average && <p className='text-yellow-400'>{item.vote_average} vote</p>}
                                    </div>
                                    <div>
                                        <p>{item.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </section >
            </div >
        )
    } else {
        return (
            <div className="p-2">
                <h3 className="text-2xl font-bold text-white">Movies Recommendation</h3>
                <section className='grid grid-cols-3 gap-2 mt-4'>
                    <EachUtils
                        of={moviesRecommendation}
                        render={(item, index) => (
                            <div
                                key={index}
                            >
                                <div
                                    className='relative'
                                >
                                    <img src={import.meta.env.VITE_IMAGE_URL_TMDB_API + item.poster_path}
                                        className='rounded-t-md h-52 w-full object-cover'
                                    />
                                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                                        <button
                                            onMouseEnter={() => {
                                                getVideoUrl({ movie_id: item.id }).then(result => setVideoUrl(result))
                                            }}
                                            onClick={() => {
                                                navigate(`/watch/${videoUrl}`)
                                                setIsOpenModal(false)
                                                setIdMovieDetail(null)
                                            }}
                                            className='text-white hover:text-gray-200 transition-all cursor-pointer'>
                                            <GoPlay size={44} />
                                        </button>
                                    </div>
                                </div>
                                <div className='bg-[#1e1e1e] h-full px-2 py-1 max-h-48 overflow-y-scroll rounded-b-md'>
                                    <div className='flex gap-2'>
                                        <p>{item.release_date}</p>
                                        <p className='text-yellow-400'>{item.vote_average} vote</p>
                                    </div>
                                    <div>
                                        <p>{item.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </section>
            </div>
        )
    }
    // <>
    //     {url.pathname === `/trending/${moviesTypeTrending}/${timeWindow}` ? (
    // <div className="p-2">
    //     <h3 className="text-2xl font-bold text-white">Movies Recommendation</h3>
    //     <section className='grid grid-cols-3 gap-2 mt-4'>
    //         <EachUtils
    //             of={moviesRecommendationTrend}
    //             render={(item, index) => (
    //                 <div
    //                     key={index}
    //                 >
    //                     <div
    //                         className='relative'
    //                     >
    //                         <img src={import.meta.env.VITE_IMAGE_URL_TMDB_API + item.poster_path}
    //                             className='rounded-t-md h-52 w-full object-cover'
    //                         />
    //                         <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
    //                             <button
    //                                 onMouseEnter={() => {
    //                                     getVideoUrlTV({ moviesTypeTrending, movieId: item.id }).then(result => setVideoUrlTrending(result))
    //                                 }}
    //                                 onClick={() => {
    //                                     navigate(`/watch/${videoUrlTrending}`)
    //                                     setIsOpenModal(false)
    //                                     setIdMovieDetailTrending(null)
    //                                 }}
    //                                 className='text-white hover:text-gray-200 transition-all cursor-pointer'>
    //                                 <GoPlay size={44} />
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div className='bg-[#1e1e1e] h-full px-2 py-1 max-h-48 overflow-y-scroll rounded-b-md'>
    //                         <div className='flex gap-2'>
    //                             <p>{!item.release_date ? item.first_air_date : item.release_date}</p>
    //                             {item.runtime && <p className='text-green-400'>{item.runtime} minutes</p>}
    //                             {item.vote_average && <p className='text-green-400'>{item.vote_average} vote</p>}
    //                         </div>
    //                         <div>
    //                             <p>{item.overview}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         />
    //     </section >
    // </div >
    //     ) : (
    // <div className="p-2">
    //     <h3 className="text-2xl font-bold text-white">Movies Recommendation</h3>
    //     <section className='grid grid-cols-3 gap-2 mt-4'>
    //         <EachUtils
    //             of={moviesRecommendation}
    //             render={(item, index) => (
    //                 <div
    //                     key={index}
    //                 >
    //                     <div
    //                         className='relative'
    //                     >
    //                         <img src={import.meta.env.VITE_IMAGE_URL_TMDB_API + item.poster_path}
    //                             className='rounded-t-md h-52 w-full object-cover'
    //                         />
    //                         <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
    //                             <button
    //                                 onMouseEnter={() => {
    //                                     getVideoUrl({ movie_id: item.id }).then(result => setVideoUrl(result))
    //                                 }}
    //                                 onClick={() => {
    //                                     navigate(`/watch/${videoUrl}`)
    //                                     setIsOpenModal(false)
    //                                     setIdMovieDetail(null)
    //                                 }}
    //                                 className='text-white hover:text-gray-200 transition-all cursor-pointer'>
    //                                 <GoPlay size={44} />
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div className='bg-[#1e1e1e] h-full px-2 py-1 max-h-48 overflow-y-scroll rounded-b-md'>
    //                         <div className='flex gap-2'>
    //                             <p>{item.release_date}</p>
    //                             <p className='text-green-400'>{item.vote_average} vote</p>
    //                         </div>
    //                         <div>
    //                             <p>{item.overview}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         />
    //     </section>
    // </div>
    //     )}
    // </>
}

export default Recommendation
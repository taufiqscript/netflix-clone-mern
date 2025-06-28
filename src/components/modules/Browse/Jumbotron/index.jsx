import ReactPlayer from "react-player"
import { GoMute, GoPlay, GoUnmute } from "react-icons/go"
import { useEffect, useState } from "react"
import { getMoviesByType } from "../../../../utils/getMoviesByType"
import { getVideoUrl } from "../../../../utils/getVideoUrl"
import { useAtom } from "jotai"
import { idMovieDetailAtom, isOpenModalAtom } from "../../../../jotai/atoms"
import { useNavigate } from "react-router-dom"


const Jumbotron = () => {
    const navigate = useNavigate()

    const [isMute, setIsMute] = useState(true)
    const [jumbotronMovie, setJumbotronMovie] = useState(null)
    const [idMovie, setIdMovie] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [isShow, setIsShow] = useState("")

    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [, setIdMovieDetail] = useAtom(idMovieDetailAtom)

    useEffect(() => {
        const fetchJumbotron = async () => {
            try {
                const movie = await getMoviesByType({ moviesType: "popular" })
                const jumboMovie = movie[0]
                setJumbotronMovie(jumboMovie)
                setIdMovie(jumboMovie.id)

                const videoKey = await getVideoUrl({ movie_id: jumboMovie.id })
                setVideoUrl(videoKey)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJumbotron()
    }, [])

    const handleOverview = (text, maxWord) => {
        if (!text) return ""
        const word = text.split(' ')
        if (word.length <= maxWord) return text
        return word.slice(0, maxWord).join(" ") + "..."
    }

    return (
        <div className="relative h-[400px] sm:h-[610px]">
            {videoUrl && (
                <>
                    <div className="h-[500px] sm:h-[800px]">
                    <ReactPlayer
                        url={`https://youtube.com/watch?v=${videoUrl}`}
                        playing={true}
                        width={"100%"}
                            height={"100%"}
                        loop={true}
                        muted={isMute}
                        controls={false}
                    />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-8 text-white max-w-xl w-65 sm:w-full">
                        <h3 className="sm:text-5xl text-xl font-black">{jumbotronMovie?.title}</h3>
                        <>
                            <p
                                className={`block sm:hidden text-md`}>
                                ...
                            </p>
                            <p
                                className={`hidden sm:block text-md mt-4`}>
                                {handleOverview(jumbotronMovie.overview, 30)}
                            </p>
                        </>
                        <div className="flex items-center gap-1.5 sm:gap-3 mt-4">
                            <button
                                onClick={() => navigate(`/watch/${videoUrl}`)}
                                className="bg-slate-200 px-2 py-1 sm:px-4 sm:py-2 rounded-xl text-sm text-black font-semibold cursor-pointer flex items-center gap-1 hover:bg-gray-300 transition-all">
                                <GoPlay className="text-[16px] sm:text-[20px]" />
                                Play
                            </button>
                            <button
                                onClick={() => {
                                    setIdMovieDetail(idMovie)
                                    setIsOpenModal(true)
                                }}
                                className="bg-stone-600/80 px-2 py-1 sm:px-4 sm:py-2 rounded-xl text-sm font-semibold cursor-pointer">More Detail</button>
                            <div
                                onClick={() => setIsMute(!isMute)}
                                className="border rounded-full p-1 cursor-pointer border-2 hover:text-gray-200 transition-all">
                                {isMute ? <GoMute className="text-[14px] sm:text-[20px]" /> : <GoUnmute className="text-[14px] sm:text-[20px]" />}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Jumbotron
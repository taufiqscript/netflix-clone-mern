import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AccountMenu from '../../components/modules/Browse/AccountMenu'
import SearchInput from '../../components/modules/Browse/SearchInput'
import { useAtom } from 'jotai'
import { isShowAtom, moviesTypeStateStorage, moviesTypeTrendingStorage } from '../../jotai/atoms'

const Navbar = ({ style }) => {
    const navigate = useNavigate()

    const { timeWindow } = useParams()
    const url = useLocation()

    const [, setMoviesTypeState] = useAtom(moviesTypeStateStorage)
    const [, setMoviesTypeTrending] = useAtom(moviesTypeTrendingStorage)

    const [isShow] = useAtom(isShowAtom)

    return (
        <header className={`w-full ${style}`}>
            <nav className='flex justify-between py-2 px-1.5 sm:px-4 items-center bg-[#1e1e1e] fixed z-50 w-full'>
                <div className='flex items-center gap-1.5 sm:gap-4'>
                    <img src='/netflix-logo-icon-dea-afrizal.png'
                        className='cursor-pointer hover:scale-110 w-[80px] sm:w-[120px] transition-all'
                        onClick={() => navigate("/browse")}
                    />
                    <div className={`flex sm:flex gap-1.5 sm:gap-4 text-sm sm:text-lg ${isShow ? "hidden sm:block" : "block sm:block"}`}>
                        <a
                            className='text-white hover:text-gray-300 hover:underline transition-all'
                            href='/browse'
                        >Home</a>

                        <div className='dropdown dropdown-hover dropdown-bottom'>
                            <a
                                tabIndex={0}
                                className='text-white hover:text-gray-300 hover:underline transition-all cursor-pointer'
                            >Movies</a>
                            <ul
                                tabIndex={0}
                                className='dropdown-content bg-white text-black py-2 rounded font-semibold w-35'
                            >
                                <li
                                    onClick={() => {
                                        navigate("/movie/popular")
                                        setMoviesTypeState("Popular")
                                        location.reload()
                                    }}
                                    className='cursor-pointer hover:bg-gray-200 transition-all pl-2 flex gap-1 items-center'>
                                    Popular
                                    {url.pathname === "/movie/popular" && (<div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>)}
                                </li>
                                <li
                                    onClick={() => {
                                        navigate("/movie/now_playing")
                                        setMoviesTypeState("Now Playing")
                                        location.reload()
                                    }}
                                    className='cursor-pointer hover:bg-gray-200 pl-2 transition-all flex gap-1 items-center'>
                                    Now Playing
                                    {url.pathname === "/movie/now_playing" && (<div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>)}
                                </li>
                                <li
                                    onClick={() => {
                                        navigate("/movie/upcoming")
                                        setMoviesTypeState("Upcoming")
                                        location.reload()
                                    }}
                                    className='cursor-pointer hover:bg-gray-200 pl-2 transition-all flex items-center gap-1'>
                                    Upcoming
                                    {url.pathname === "/movie/upcoming" && (<div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>)}
                                </li>
                                <li
                                    onClick={() => {
                                        navigate("/movie/top_rated")
                                        setMoviesTypeState("Top Rated")
                                        location.reload()
                                    }}
                                    className='cursor-pointer hover:bg-gray-200 pl-2 transition-all flex items-center gap-1'>
                                    Top Rated
                                    {url.pathname === "/movie/top_rated" && (<div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>)}
                                </li>
                            </ul>
                        </div>
                        <div className='dropdown dropdown-hover dropdown-bottom'>
                            <a
                                tabIndex={0}
                                className='text-white hover:text-gray-300 hover:underline transition-all cursor-pointer'
                            >Trending
                            </a>
                            <ul
                                tabIndex={0}
                                className='dropdown-content bg-white w-24 text-black rounded py-1 font-semibold'>
                                <li
                                    onClick={() => {
                                        setMoviesTypeTrending("Movie")
                                        navigate('/trending/movie/day')
                                        location.reload()
                                    }}
                                    className='pl-2 cursor-pointer hover:bg-gray-200 transition-all flex items-center gap-1'
                                >
                                    Movie
                                    {url.pathname === `/trending/movie/${timeWindow}` && <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>}
                                </li>
                                <li
                                    onClick={() => {
                                        setMoviesTypeTrending("TV")
                                        navigate('/trending/tv/day')
                                        location.reload()
                                    }}
                                    className='pl-2 cursor-pointer hover:bg-gray-200 transition-all flex items-center gap-1'
                                >
                                    TV
                                    {url.pathname === `/trending/tv/${timeWindow}` && <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                    </div>}
                                </li>
                            </ul>
                        </div>
                        <a
                            className='text-white hover:text-gray-300 hover:underline transition-all'
                            href='/favorite'
                        >My List</a>
                    </div>
                </div>
                <div className='flex gap-1.5 sm:gap-4 items-center'>
                    <SearchInput />
                    <AccountMenu />
                </div>
            </nav>
        </header >
    )
}

export default Navbar
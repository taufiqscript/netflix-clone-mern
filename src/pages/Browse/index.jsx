import { useAtom } from 'jotai'
import BrowseLayout from '../../components/layouts/BrowseLayout'
import Jumbotron from '../../components/modules/Browse/Jumbotron'
import Modal from '../../components/modules/Browse/Modal/index'
import MovieList from '../../components/modules/Browse/MovieList'
import { searchMoviesAtom } from '../../jotai/atoms'
import SearchMovies from '../../components/modules/Browse/SearchMovies'

const Browse = () => {
    const [query] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout>
            {query ? <SearchMovies /> : (
                <>
                    <Jumbotron />
                    <MovieList title={"Now Playing"} moviesType={"now_playing"} />
                    <MovieList title={"Popular"} moviesType={"popular"} />
                    <MovieList title={"Top Rated"} moviesType={"top_rated"} />
                    <MovieList title={"Upcoming"} moviesType={"upcoming"} />
                </>
            )}
            <Modal />
        </BrowseLayout>
    )
}

export default Browse
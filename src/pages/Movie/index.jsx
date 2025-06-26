import BrowseLayout from '../../components/layouts/BrowseLayout/index'
import Modal from '../../components/modules/Browse/Modal/index'
import { useAtom } from 'jotai'
import { searchMoviesAtom } from '../../jotai/atoms'
import SearchMovies from '../../components/modules/Browse/SearchMovies'
import MovieList from '../../components/modules/Browse/MovieList'

const Movie = () => {
    const [query] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout style={!query && "pt-24 px-4 pb-4"}>
            {query ? <SearchMovies /> : <MovieList />}
            <Modal />
        </BrowseLayout>
    )
}

export default Movie
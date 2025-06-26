import BrowseLayout from "../../components/layouts/BrowseLayout"
import Modal from '../../components/modules/Browse/Modal/index'
import { useAtom } from 'jotai'
import { searchMoviesAtom } from '../../jotai/atoms'
import MovieList from "../../components/modules/Browse/MovieList/index"
import SearchMovies from "../../components/modules/Browse/SearchMovies"


const Trending = () => {

    const [query] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout style={!query && "pt-24 px-4 pb-4"}>
            {query ? <SearchMovies /> : <MovieList />}
            <Modal />
        </BrowseLayout>
    )
}

export default Trending
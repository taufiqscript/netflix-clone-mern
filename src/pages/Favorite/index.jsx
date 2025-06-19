import BrowseLayout from '../../components/layouts/BrowseLayout'
import { useAtom } from "jotai"
import { searchMoviesAtom } from "../../jotai/atoms"
import Modal from '../../components/modules/Browse/Modal/index'
import SearchMovies from "../../components/modules/Browse/SearchMovies"
import MovieList from "../../components/modules/Browse/MovieList"


const Favorite = () => {
    const [query] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout>
            {query ? <SearchMovies /> : <MovieList />}
            <Modal />
        </BrowseLayout>
    )
}

export default Favorite
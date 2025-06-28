import { GoSearch } from 'react-icons/go'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { isShowAtom, searchMoviesAtom } from '../../../../jotai/atoms'


const SearchInput = () => {
    const [isShow, setIsShow] = useAtom(isShowAtom)
    const [, setSearchMovies] = useAtom(searchMoviesAtom)

    const handleChange = (e) => {
        if (e.target.value.length > 3) {
            setSearchMovies(e.target.value)
        } else {
            setSearchMovies(null)
        }
    }

    return (
        <div className='relative flex'>
            <motion.input
                initial={{ translateX: -10 }}
                animate={{ translateX: isShow ? 0 : -10 }}
                exit={{ translateX: -10 }}
                placeholder='genre, people, movies'
                className='bg-black py-1 sm:py-2 pl-6 sm:pl-7.5 rounded-md w-[10em] sm:w-[14em] placeholder:text-[12.5px] placeholder:sm:text-lg'
                style={{ display: isShow ? "block" : "none" }}
                onChange={handleChange}
            />
            <div
                onClick={() => setIsShow(!isShow)}
                className={isShow ? 'absolute top-1/2 -translate-y-1/2 left-1 cursor-pointer text-white' : null}>
                <GoSearch className='cursor-pointer text-lg sm:text-2xl ' />
            </div>
        </div>
    )
}

export default SearchInput
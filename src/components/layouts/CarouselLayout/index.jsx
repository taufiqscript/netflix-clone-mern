import { useRef } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

const CarouselLayout = ({ children }) => {
    const ref = useRef()

    const handleScroll = (offset) => {
        ref.current.scrollLeft += offset
    }

    return (
        <div className='relative w-full'>
            <div className='absolute top-0 left-0 flex justify-between items-center w-full mt-4'>
                <button>
                    <GoChevronLeft size={32}
                        onClick={() => handleScroll(-500)}
                        className='relative hover:bg-blue-400/60 transition-all h-40 sm:h-72 w-6 sm:w-10 z-40 m-auto'
                    />
                </button>
                <button>
                    <GoChevronRight size={32} className='relative m-auto hover:bg-blue-400/60 transition-all h-40 sm:h-72 w-6 sm:w-10 z-40'
                        onClick={() => handleScroll(500)}
                    />
                </button>
            </div>
            <div
                className='carousel scroll-smooth space-x-2 w-full'
                ref={ref}
            >
                {children}
            </div>

        </div>
    )
}

export default CarouselLayout
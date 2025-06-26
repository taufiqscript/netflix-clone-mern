import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import BrowseLayout from '../../components/layouts/BrowseLayout'
import { GoChevronLeft } from 'react-icons/go'

const Watch = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    return (
        <BrowseLayout>
            <div className='relative pt-18'>
                <div className='w-full h-screen'>
                    <ReactPlayer
                        url={"https://youtube.com/watch?v=" + id}
                        playing={true}
                        width={"100%"}
                        height={"100%"}
                        loop={true}
                        muted={false}
                        controls={false}
                    />
                </div>
                <div
                    onClick={() => navigate("/browse")}
                    className='absolute top-28 left-6 border rounded-full border-2 cursor-pointer '>
                    <GoChevronLeft size={32}
                        className='hover:scale-110 transition-all hover:text-white'
                    />
                </div>
            </div>
        </BrowseLayout>
    )
}

export default Watch
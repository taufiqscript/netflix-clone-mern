import OptionLanguage from '../../components/modules/Landing/OptionLanguage'
import DefaultButton from '../../components/modules/Landing/DefaultButton'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <header className='absolute top-0 left-0 w-full z-20 bg-transparent'>
            <nav className='flex justify-between items-center w-full px-4 py-1 max-w-6xl mx-auto'>

                <img src='/netflix-logo-icon-dea-afrizal.png' alt='netflix-logo'
                    className='h-[40px] sm:h-[100px] sm:w-[160px] w-[80px]'
                />
                <div className='flex gap-2 items-center'>
                    <OptionLanguage />
                    <DefaultButton
                        text={"Sign-In"}
                        styles={"text-xs px-2 py-1 sm:px-4 sm:py-2"}
                        onClick={() => navigate("/login")}
                    />
                </div>

            </nav>
        </header>
    )
}

export default Navbar
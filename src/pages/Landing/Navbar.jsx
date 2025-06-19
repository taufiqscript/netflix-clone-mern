import OptionLanguage from '../../components/modules/Landing/OptionLanguage'
import DefaultButton from '../../components/modules/Landing/DefaultButton'

const Navbar = () => {
    return (
        <header className='absolute top-0 left-0 w-full z-20 bg-transparent'>
            <nav className='flex justify-between items-center w-full px-4 py-1 max-w-6xl mx-auto'>

                <img src='/netflix-logo-icon-dea-afrizal.png' alt='netflix-logo' width={160}
                    className='h-[100px]'
                />
                <div className='sm:flex gap-2 items-center hidden sm:block'>
                    <OptionLanguage />
                    <DefaultButton
                        text={"Sign-In"}
                        styles={"px-4 py-2"}
                        onClick={() => location.replace("/login")}
                    />
                </div>

            </nav>
        </header>
    )
}

export default Navbar
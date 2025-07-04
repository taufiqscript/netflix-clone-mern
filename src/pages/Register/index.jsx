import DefaultLayout from '../../components/layouts/DefaultLayout'
import { JUMBOTRON_IMAGE } from '../../constans/listAsset'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { emailAtom, passwordAtom } from '../../jotai/atoms'
import { auth } from '../../utils/firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { apiInstanceExpress } from '../../utils/apiInstance'
import { useState } from 'react'
import Notify from '../../components/modules/Notify'


const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useAtom(passwordAtom)

    const [notifMessage, setNotifMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        console.log("👉 BASE_URL_EXPRESS:", import.meta.env.VITE_BASE_URL_EXPRESS)
        try {
            setIsSubmit(true)
            setLoading(true)
            const register = await createUserWithEmailAndPassword(auth, email, password)
            if (register) {

                const addNewUser = await apiInstanceExpress.post("/sign-up", { email, password })

                if (addNewUser.status !== 201) return setNotifMessage('Register Gagal!')
                setNotifMessage("Register Berhasil")
                setTimeout(() => {
                    setLoading(false)
                    navigate('/login')
                    signOut(auth)
                }, 1500)
            }
        } catch (error) {
            alert(error)
            return setLoading(false)
        }
    }

    return (
        <DefaultLayout>
            {isSubmit ? <Notify message={notifMessage} style={"toast-top"} onClose={() => {
                setNotifMessage(null)
                setIsSubmit(false)
            }} /> : null}
            <div className='relative'>
                <img src={JUMBOTRON_IMAGE}
                    className='relative w-full h-screen object-cover opacity-60'
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-full max-w-xl w-sm sm:w-xl mx-auto p-8 rounded-xl'>
                    <div className='mb-3 flex gap-1 items-center'>
                        <GoChevronLeft size={30}
                            className='cursor-pointer hover:text-white hover:scale-110 transition-all'
                            onClick={() => navigate('/')}
                        />
                        <h3 className='text-lg font-semibold text-white'>Sign Up</h3>
                    </div>
                    <form className='flex flex-col gap-4'>
                        <div className='relative'>
                            <input
                                value={email ? email : ""}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                placeholder="email"
                                className='bg-black/50 p-3 rounded-md w-full peer placeholder-transparent border border-white/50 z-10'
                            />
                            <label
                                className='absolute top-0 left-3 peer-placeholder-shown:top-3 peer-focus:top-[1px] peer-focus:text-sm transition-all duration-200 ease-in-out -z-10'
                            >
                                Email
                            </label>
                        </div>
                        <div className='relative'>
                            <input
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                className='bg-black/50 p-3 rounded-md w-full peer placeholder-transparent border border-white/50 z-10'
                            />
                            <label
                                className='absolute top-0 left-3 peer-placeholder-shown:top-3 peer-focus:top-[1px] peer-focus:text-sm transition-all duration-200 ease-in-out -z-10'
                            >
                                Password
                            </label>
                        </div>
                        <div className='flex flex-col gap-2 text-white'>
                            <button
                                onClick={handleSignUp}
                                disabled={loading}
                                className='bg-red-600 py-2 rounded-md text-center font-bold text-xl cursor-pointer hover:bg-red-700 transition-all cursor-pointer w-full disabled:bg-red-400 disabled:cursor-wait'>Sign Up</button>
                            <p>Already Have An Account? <span
                                className='cursor-pointer hover:text-blue-500 underline transition-all'
                                onClick={() => navigate('/login')}
                            >login here
                            </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Register
import { JUMBOTRON_IMAGE } from '../../constans/listAsset'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { emailAtom, emailStorageAtom, passwordAtom, tokenStorageAtom } from '../../jotai/atoms'
import { auth } from '../../utils/firebase'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'
import { apiInstanceExpress } from '../../utils/apiInstance'
import { useState } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout'

const Login = () => {
    const navigate = useNavigate()

    const [, setEmailStorage] = useAtom(emailStorageAtom)
    const [, setTokenStorage] = useAtom(tokenStorageAtom)

    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useAtom(passwordAtom)

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await signInWithEmailAndPassword(auth, email, password)
            if (login && login.user) {
                await new Promise(resolve => setTimeout(resolve, 500))
                const token = await getIdToken(login.user, true)
                console.log("🔥 Firebase ID Token:", token)

                setTokenStorage(token)
                setEmailStorage(login.user.email)

                console.log("📡 Sending to backend:", {
                    email,
                    token
                });

                const user = await apiInstanceExpress.post("/sign-in", {
                    email,
                    token
                })

                if (user.status === 201) {
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <DefaultLayout>
            <div className='relative'>
                <img src={JUMBOTRON_IMAGE}
                    className='relative w-full h-screen object-cover opacity-60'
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-full max-w-xl mx-auto p-8 rounded-xl'>
                    <div className='mb-3 flex gap-1 items-center'>
                        <GoChevronLeft size={30}
                            className='cursor-pointer hover:text-white hover:scale-110 transition-all'
                            onClick={() => navigate('/')}
                        />
                        <h3 className='text-lg font-semibold text-white'>Login</h3>
                    </div>
                    <form className='flex flex-col gap-4'>
                        <div className='relative'>
                            <input
                                type='email'
                                value={email ? email : ""}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onClick={handleLogin}
                                disabled={loading}
                                className='bg-red-600 py-2 rounded-md text-center font-bold text-xl cursor-pointer hover:bg-red-700 transition-all cursor-pointer w-full disabled:bg-red-400 disabled:cursor-not-allowed'>Login</button>
                            <p>New To Here? <span
                                className='cursor-pointer hover:text-blue-500 underline transition-all'
                                onClick={() => navigate('/register')}
                            >sign-up
                            </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Login
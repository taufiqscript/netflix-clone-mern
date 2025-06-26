import { signOut } from 'firebase/auth'
import { auth } from '../../../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenStorageAtom } from '../../../../jotai/atoms'
import { apiInstanceExpress } from "../../../../utils/apiInstance"

const AccountMenu = () => {
    const navigate = useNavigate()

    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom)

    const handleSignOut = async () => {
        try {
            const logout = signOut(auth)
            if (logout) {
                const userLogout = await apiInstanceExpress.delete("/sign-out", {
                    data: {
                        email: emailStorage,
                        token: tokenStorage
                    }
                })

                if (userLogout.status !== 204) return alert('sign-out gagal!')

                setEmailStorage(null)
                setTokenStorage(null)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="dropdown dropdown-hover dropdown-end">
            <div className="avatar cursor-pointer">
                <div tabIndex={0} className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                </div>
                <div tabIndex={0} className='dropdown-content'>

                    <button
                        className="mt-10 w-38 bg-black py-2 px-4 rounded-lg transition-all flex flex-col text-center justify-center border border-white/50">
                        <p className='cursor-text italic text-sm'>{emailStorage}</p>
                        <div className='flex items-center justify-center gap-1 cursor-pointer hover:scale-105 hover:text-red-600 hover:font-semibold transition-all'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span
                                onClick={handleSignOut}
                            >Sign-Out</span>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AccountMenu
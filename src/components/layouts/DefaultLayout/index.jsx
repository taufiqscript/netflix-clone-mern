import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenStorageAtom } from '../../../jotai/atoms'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DefaultLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const navigate = useNavigate()

    useEffect(() => {
        if (user && emailStorage && tokenStorage) {
            navigate("/browse")
        }
    }, [user, emailStorage, tokenStorage, navigate])

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error!!!</p>

    return (
        <div>
            {children}
        </div>
    )
}

export default DefaultLayout
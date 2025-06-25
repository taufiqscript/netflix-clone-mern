import Navbar from '../../../pages/Browse/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenStorageAtom } from '../../../jotai/atoms'
import Loading from '../../modules/Loading/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const BrowseLayout = ({ children, style }) => {
    const [user, loading, error] = useAuthState(auth)

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !emailStorage && !tokenStorage) {
            navigate('/')
        }
    }, [])

    if (loading) return <Loading />

    if (error) return <p>Error!!!</p>

    return (
        <div>
            <Navbar />
            <div className={`${style}`}>
                {children}
            </div>
        </div>
    )
}

export default BrowseLayout
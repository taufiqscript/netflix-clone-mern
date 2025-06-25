import Navbar from '../../../pages/Browse/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenStorageAtom } from '../../../jotai/atoms'
import Loading from '../../modules/Loading/index'

const BrowseLayout = ({ children, style }) => {
    const [user, loading, error] = useAuthState(auth)

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    if (loading) return <Loading />

    if (error) return <p>Error!!!</p>

    if (!user && !emailStorage && !tokenStorage) return location.replace('/')

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
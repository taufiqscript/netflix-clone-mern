import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import { useAtom } from 'jotai'
import { emailStorageAtom, tokenStorageAtom } from '../../../jotai/atoms'

const DefaultLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)

    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error!!!</p>

    if (user && emailStorage && tokenStorage) return location.replace('/browse')

    return (
        <div>
            {children}
        </div>
    )
}

export default DefaultLayout
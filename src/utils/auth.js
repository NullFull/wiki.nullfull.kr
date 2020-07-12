import React from 'react'
import { client } from 'utils/api'
import { getFirebase } from 'utils/firebase/app'
import 'firebase/auth'


const AuthContext = React.createContext({})


const AuthProvider = ({children}) => {
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)


    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const [_, user] = await client.get('/session')
                setUser(user)
            } catch (e) {

            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])


    const signIn = async () => {
        const firebase = getFirebase()

        const provider = new firebase.auth.GithubAuthProvider()

        const auth = firebase.auth()
        await auth.setPersistence(firebase.auth.Auth.Persistence.NONE)

        const result = await auth.signInWithPopup(provider)

        const idToken = await result.user.getIdToken()
        const [_, data] = await client.post('/session', {
            idToken
        })

        setUser(result.user)
    }

    const signOut = async () => {
        await client.delete('/session')

        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            loading, user,
            signIn, signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = () => React.useContext(AuthContext)


export {
    useAuth,
    AuthProvider
}

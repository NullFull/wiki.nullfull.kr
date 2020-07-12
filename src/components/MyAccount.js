import React from 'react'
import { useAuth } from 'utils/auth'


export default () => {
    const {loading, user, signIn, signOut} = useAuth()

    if (loading) {
        return <div>...</div>
    }

    return (
        <div>
            {user ?
                <>
                    <div>{user.email}</div>
                    <div>
                        <button onClick={signOut}>로그아웃</button>
                    </div>
                </> :
                <>
                    <div>
                        <button onClick={signIn}>로그인</button>
                    </div>
                </>
            }
        </div>
    )
}

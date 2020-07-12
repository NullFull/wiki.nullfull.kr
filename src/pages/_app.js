import React from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import { AuthProvider } from 'utils/auth'
import './global.css'


export default ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </AuthProvider>
    )
}

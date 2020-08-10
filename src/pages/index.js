import React from 'react'
import { useRouter } from 'next/router'


const URL_INDEX = '/w/대문'

const Index = () => {
    const router = useRouter()
    router.push(URL_INDEX)
    return null
}

Index.getInitialProps = async ({req, res}) => {
    if (req) {
        res.writeHead(301, {
            Location: encodeURI(URL_INDEX)
        })
        res.end()
    }

    return {}
}


export default Index

import React from 'react'
import { useRouter } from 'next/router'


const URL_INDEX = '/w/대문'

const Index = () => {
    const router = useRouter()
    router.push(URL_INDEX)
    return null
}

Index.getInitialProps = async (ctx) => {
    const { res } = ctx

    if (res) {
        res.writeHead(301, {Location: URL_INDEX}).end()
    }

    return {

    }
}


export default Index

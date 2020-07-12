import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import SearchBar from 'components/SearchBar'
import MyAccount from 'components/MyAccount'


const Layout = styled.div`
    font-family: sans-serif;
`

const Header = styled.div`
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Body = styled.div`
    max-width: 480px;
    margin: 80px auto;
`

const Home = () => <Link href="/"><a>홈</a></Link>


export default ({children}) => {
    return (
        <Layout>
            <Header>
                <div style={{width: '100px'}}>
                    <Home />
                </div>
                <div style={{flex: '1 1 0', maxWidth: '480px'}}>
                    <SearchBar />
                </div>
                <div style={{width: '100px', textAlign: 'right'}}>
                    <MyAccount />
                </div>
            </Header>
            <Body>
                {children}
            </Body>
        </Layout>
    )
}
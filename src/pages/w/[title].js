import React from 'react'
import Editor from 'rich-markdown-editor'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { debounce } from 'debounce'
import { name2url, url2name } from 'utils/url'
import { useAuth } from 'utils/auth'
import { client } from 'utils/api'


const Content = styled.div`
    padding: 20px 40px 80px 40px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
`

const Tools = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    margin: 10px;
    width: 50px;
    height: 50px;
    border: 1px solid #eeeeee;
    border-radius: 25px;
    background: white;
    // box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
`


const Page = ({title, page}) => {
    const router = useRouter()
    const { user } = useAuth()
    const [editable, setEditable] = React.useState(false)
    const [content, setContent] = React.useState(page ? page.content : '')

    const handleChange = debounce(value => {
        setContent(value)
    }, 500)

    const startEdit = () => {
        if (!user) {
            alert('수정하려면 로그인 하세요')
            return
        }

        setEditable(true)
    }

    const discard = () => {
        // TODO : reload
        setEditable(false)
    }

    const save = async () => {
        const key = title
        await client.post(`/pages/${key}`, {
            content
        })

        setEditable(false)
    }

    return (
        <div>
            <Content>
                <h1>{title}</h1>
                <Editor
                    onCreateLink={name => {
                        return new Promise((resolve => {
                            resolve(name2url(name))
                        }))
                    }}
                    onClickLink={href => {
                        const url = new URL(href)

                        if (url.host === window.location.host) {
                            router.push(url.pathname)
                        } else {
                            window.location.href = href
                        }
                    }}
                    readOnly={!editable}
                    defaultValue={content}
                    onChange={handleChange}
                />
            </Content>
            <Tools>
                {editable ?
                    <>
                        <Button onClick={save}>저장</Button>
                    </> :
                    <>
                        <Button onClick={startEdit}>수정</Button>
                    </>
                }
            </Tools>
        </div>
    )
}


Page.getInitialProps = async ({ query }) => {
    const { title } = query
    const normalizedTitle = url2name(title)

    try {
        const [_, page] = await client.get(`/pages/${encodeURI(title)}`)
        return {
            title: normalizedTitle,
            page
        }
    } catch (e) {
        return {
            title: normalizedTitle,
            page: null
        }
    } finally {

    }
}


export default Page

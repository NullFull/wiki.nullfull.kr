import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`

`

const Input = styled.input`
    outline: none;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 25px;
    background: #E1E1E1;
`


export default () => {
    return (
        <Wrapper>
            <Input />
        </Wrapper>
    )
}

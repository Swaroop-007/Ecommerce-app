import React from 'react'
import { styled } from 'styled-components'
import Navbar from './Navbar'

const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
`

const Container=styled.div`
  display: flex;
  min-height: 65vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title =styled.h1`
  font-size: 100px;
  font-weight: 700;
`
const Heading=styled.h2`
    font-weight: normal;
`

const Button =styled.button`
  color: black;
  background-color: wheat;
  border: 1px solid orange;
  text-decoration: none;
  padding: 10px;
  margin-top: 10px;
  &:hover{
    color: orange;
  }
`


const Pagenotfound = () => {
  return (
    <Wrapper>
        <Navbar/>
        <Container>
        <Title>404</Title>
        <Heading>PAGE NOT FOUND!</Heading>
        <Button>GO BACK</Button>
    </Container>
    </Wrapper>
    
  )
}

export default Pagenotfound
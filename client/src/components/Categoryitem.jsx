import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';

const Container=styled.div`
    flex: 1;
    display: block;
    margin: 30px;
    height: 70vh;
    position: relative;
    transition: box-shadow 0.5s, transform 0.3s ease;
    
    &:hover
    {
      box-shadow: 0px 0px 40px #e7bc6d;
      transform: scale(1.1);
      cursor: pointer;
    }
    
    
    
`
const Image=styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    
    
   
    
    
`
const Info=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

`
const Title=styled.h1`
    color: white;
`
const Categoryitem = ({item}) => {
  
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
            <Image src={item.img}/>
            <Info>
            <Title>{item.title}</Title>
            </Info>
        </Link>
    </Container>
  )
}

export default Categoryitem
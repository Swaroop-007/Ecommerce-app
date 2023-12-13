import React, { useState } from 'react'
import { KeyboardDoubleArrowLeft,KeyboardDoubleArrowRight } from '@mui/icons-material'
import { styled } from 'styled-components'
import { slideritems } from '../data.js'



const Container=styled.div`
    width: 100%;
    height: 89.4vh;
    display: flex;
    background-color: white;
    position: relative;
    overflow: hidden;
`
const Arrow=styled.div`
    width: 50px;
    height: 50px;
    background-color: wheat;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props=>props.dir==="left" && "10px"};
    right: ${props=>props.dir==="right" && "10px"};
    margin: auto;
    transition: all 0.8s ease;
    &:hover,
    &:focus{
        background-color: orange;
        transform: scale(1.1);
        cursor: pointer;
    }
    opacity: 0.5;
    z-index: 2;
`
const Wrapper=styled.div`
    height: 100%;
    display: flex;
    transition:all 1s ease;
    transform: translate(${props=>props.slideindex*-100}vw);
    
`

const Slide=styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;

`
const ImgContainer=styled.div`
    height: 100vh;
    flex: 1;
`
const Image=styled.img`
    height: 80%;
    
`

const InfoContainer=styled.div`
    flex: 1;
    padding: 50px;
`
const Title=styled.h1`
    color: #${props=>props.tc};
`
const Description=styled.p`
    font-size: 20px;
    margin: 50px 0px;
    font-weight: 500;
    letter-spacing: 2px;
    
`
const Button = styled.button`
    padding: 10px ;
    font-size: 20px;
    outline: none;
    border: none;
    background-color: wheat;
    border-radius: 10px 10px;
    cursor: pointer;
    &:hover,
    &:focus{
        background-color: orange;
        font-weight: 500;
        box-shadow: 1px 4px 4px  #e7bc6d;
    }
`
const Slider = () => {
    const [slideindex,setSlideIndex]=useState(0);
    const handleclick = (direction) => {
        if(direction==="left"){
            setSlideIndex(slideindex>0?slideindex-1:2)
        }else{
            setSlideIndex(slideindex<2?slideindex+1:0)
        }
    }
  return (
    <Container>
        <Arrow dir="left" onClick={()=>handleclick("left")}>
            <KeyboardDoubleArrowLeft/>
        </Arrow>
        <Wrapper slideindex={slideindex}>

            {slideritems.map((item)=>(
                <Slide key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title tc={item.color}>{item.title}</Title>
                        <Description>
                            {item.desc}
                        </Description>
                            <Button>Buy Now</Button>
                    </InfoContainer>
                </Slide>
            ))}
            
        </Wrapper>
        <Arrow dir="right" onClick={()=>handleclick("right")}>
            <KeyboardDoubleArrowRight/>
        </Arrow>
    </Container>
  )
}

export default Slider
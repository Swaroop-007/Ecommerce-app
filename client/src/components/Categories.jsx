import React from 'react'
import { styled } from "styled-components"
import { categories } from "../data"
import CategoryItem from './Categoryitem'




const Container=styled.div`
    display: flex;
    padding: 50px;
    justify-content: space-between;
    
    background-color:#ebe8e3;
   


`

const Categories = () => {
  return (
    
      <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id} />
        ))}
    </Container>
    
    
  )
}

export default Categories


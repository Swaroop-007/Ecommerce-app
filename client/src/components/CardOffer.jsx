import React from 'react'
import { styled } from 'styled-components'

const Container =styled.div`
    height: 30px;
    background-color:teal;
    text-align: center;
    padding: 2px;
    color: white;

`

const CardOffer = () => {
  return (
    <Container>10% Upto {'\u20B9'}5000 OFF Using HDFC Debit & Credit Cards EMI/Non-EMI Transactions</Container>
  )
}

export default CardOffer
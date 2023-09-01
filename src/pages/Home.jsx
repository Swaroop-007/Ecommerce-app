import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
import CardOffer from '../components/CardOffer'
import PopularProducts from '../components/PopularProducts'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <CardOffer/>
        <h1 style={{margin:"20px"}}>Popular Products</h1>
        <PopularProducts/>
        <Footer/>
    </div>
  )
}

export default Home
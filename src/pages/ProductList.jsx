import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import { styled } from 'styled-components'
import Footer from '../components/Footer'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { categories,Brands } from '../data'


const Container =styled.div`

`

const Title=styled.h1`
  margin: 20px;
  text-transform: uppercase;
  text-decoration: underline;
  text-align: center;
  
`

const FilterContainer=styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`

const Filter=styled.div`
  margin: 20px;


`

const FilterText=styled.span`
  font-size: 20px;
  font-weight: 600;
 
`

const Select=styled.select`
  margin: 20px;
  padding: 10px;
 
`
const Option=styled.option`
  
`
const ProductContainer=styled.div`
  flex: 1;
    min-width: 280px;
    margin: 60px;
    height: 350px;
    transition: box-shadow 0.5s, transform 0.3s ease;
    background-color:white;
    
    
    &:hover
    {
      box-shadow: 0px 0px 40px orange;
      transform: scale(1.1);
      cursor: pointer;
    }
`
const ProductImage=styled.img`
    height: 75%;
`
const ProductTitle=styled.h2`
    padding: 5px;   
`


const ProductList = () => {
    const Navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [sort,setSort]=useState("newest");
    const [cat,setCat]=useState([]);
    const [brand,setBrand]=useState([])
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/products/get-product");
        setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong");
      }
    };
  
    useEffect(() => {
        if(!cat.length||!brand.length)getAllProducts();
      
    }, [cat.length,brand.length]);
    
    useEffect(()=>{
        if(cat.length||brand.length) filterProduct();
    },[cat,brand])

  

  
   

      const filterProduct = async () => {
        try {
          const { data } = await axios.post("/api/v1/products/product-filters", {
            cat,
            brand,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };

      
  return (
    <Container>
      <Navbar/>
      <Title>{cat? cat: "All SmartPhones"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filters: </FilterText>
          
          <Select name="categories" onChange={e=>setCat(e.target.value)}>
            {categories?.map(p=>(
               
                    <Option key={p.id}  value={p.category}>{p.cat}</Option>
                
            ))}
          </Select>
          
          <Select name="brand" onChange={e=>setBrand(e.target.value)}>
          {Brands?.map(p=>(
                    <Option key={p.id} value={p.brand}>{p.name}</Option>
               
            ))}
          </Select>
          
        </Filter>
        <Filter>
        <FilterText>Sort Products: </FilterText>
        <Select >
          <Option value="newest" onChange={(e)=>setSort(e.target.value)}>Newest</Option>
          <Option value="lth">Price = Low to High</Option>
          <Option value="htl">Price = High to Low</Option>
        </Select>
        </Filter>
      </FilterContainer>
      <div className="d-flex flex-wrap">
      {products.map((item) => (
        <ProductContainer onClick={() => Navigate(`/product/${item.slug}`)}>
          
          <ProductImage src={item.image} />
          <ProductTitle>{item.title}</ProductTitle>
      
        </ProductContainer>
    ))}
      </div>
      
      <Footer/>
    </Container>
  )
}

export default ProductList
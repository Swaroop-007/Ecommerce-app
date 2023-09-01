import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'
import { Link,NavLink } from 'react-router-dom'
import { useAuth  } from '../context/auth'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'


const Container= styled.div`
  height: 60px;
  background-color: #2b9af5c5;
  
`

const Wrapper=styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left=styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 30px;
  align-items: end;
  color: rgb(18, 20, 22);
  margin-right: 500px;
  cursor: pointer;
  
`
const Center=styled.div`
  flex: 1;
`

const SearchContainer=styled.div`
  
  display: flex;
  align-items: center;
  height: 40px;
`
const Input =styled.input`
  border: none;
  outline: none;
  border-radius: 10px 0px 0px 10px;
  width: 90%;
  flex: 20;
  height: 36px;
  padding-left: 10px;
  font-weight: 400;

  
`
const Logocontainer=styled.div`
  background-color:wheat;
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  padding-top: 5px;
  &:hover,
  &:focus {
    background-color: orange;
  }

`

const Right=styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  color: rgb(31, 22, 5);
  font-weight: bold;
  &:hover{
    color: orange;
  }
`
const Ul = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 70px;
  padding-top: 10px;
`

const List = styled.div`
  float: left;
  height: 100%;
  padding: 10px;
  &:hover ${Dropdown}{
    display: block;
  }
`

const Navbar = () => {

  const [auth,setAuth]=useAuth();
  const [cart] = useCart();
  const handleLogout = () =>{
    setAuth({
      ...auth, user : null, token:''
    })
    localStorage.removeItem("auth")
    toast.success('Logout Successful')
  }
  return (
    <Container>
      <Wrapper>
        <Link to='/' style={{textDecoration:'none'}}>
          <Left>PhoneX</Left>
        </Link>
        <Center>
          <SearchContainer>
            <Input/>
            <Logocontainer>
              <Search />
            </Logocontainer>
          </SearchContainer>
        </Center>
        <Right>
        <NavLink to="/products" style={{textDecoration:'none'}} ><MenuItem>PRODUCTS</MenuItem></NavLink>
        {!auth.user ? (<Link to='/register' style={{textDecoration:'none'}} ><MenuItem>REGISTER</MenuItem></Link>
        ):null}
        {!auth.user ? (<Link to='/login' style={{textDecoration:'none'}}><MenuItem>SIGN IN</MenuItem></Link>)
        :(<><Ul>
            <List>
              <NavLink to="/" style={{textDecoration:'none'}} ><MenuItem style={{textTransform: "uppercase"}}>{auth?.user?.name}</MenuItem></NavLink>
              <Dropdown>
                <NavLink to={`/dashboard/${auth?.user?.role===true? "admin":"user"}`} style={{textDecoration:'none'}}><MenuItem style={{textTransform: "uppercase"}}>Dashboard</MenuItem></NavLink>
                <NavLink to='/login' style={{textDecoration:'none'}} onClick={handleLogout}><MenuItem>LOGOUT</MenuItem></NavLink>
              </Dropdown>
            </List>
          </Ul></>)}
            <MenuItem>
              <NavLink to="/cart">
                <Badge color="primary" badgeContent={cart?.length}  >
                    <ShoppingCartOutlined />
                </Badge>
              </NavLink>
            </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar

//<Link to='/login' style={{textDecoration:'none'}} onClick={handleLogout}><MenuItem>LOGOUT</MenuItem></Link>)
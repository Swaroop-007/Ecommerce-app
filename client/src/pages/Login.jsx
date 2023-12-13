import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast';
import axios from "axios";
import Navbar from "../components/Navbar";


const BigContainer=styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex; 
  background: linear-gradient(
      rgba(138, 169, 226, 0.5),
      rgba(104, 55, 182, 0.5)
    );
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;

  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px 10px;
  border: 0.1px solid gray;
`;

const Button = styled.button`
  width: 40%;
  border: 0.1px solid black;
  padding: 15px 20px;
  background-color: wheat;
  color: black;
  margin-bottom: 10px;
  cursor: pointer;
    &:hover,
    &:focus{
        background-color: orange;
        font-weight: 500;
        box-shadow: 1px 4px 4px  #e7bc6d;
    }
`;

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth()
  const Location=useLocation()
  const Navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try { 
        const res= await axios.post("/api/v1/auth/login",{email,password});
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            Navigate(Location.state||'/');
        }
        else{
            toast.error(res.data.message);
            console.log(res.data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error('Something Went Wrong!');
    }
};
  return (
    <BigContainer>
        <Navbar/>
        <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form onSubmit={handleSubmit}>
            <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit">
                LOGIN
            </Button>
            <Links>FORGOT YOUR PASSWORD?</Links>
            <Link to='/register'>
                <Links >CREATE A NEW ACCOUNT</Links>
            </Link>
            
            </Form>
        </Wrapper>
        </Container>
    </BigContainer>
    
  );
};

export default Login;
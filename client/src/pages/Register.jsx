import { useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(241, 241, 231, 0.5),
      wheat
    );
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  border: 0.5px solid black;

  background: linear-gradient(
      rgba(235, 238, 241, 0.5),
      #96c9f3c5
    );

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-decoration: underline;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 0.1px solid gray;
  border-radius: 10px 10px;
  outline: none;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: 0.1px solid black;
  padding: 15px 20px;
  background-color: wheat;
  color: black;
  font-weight: bold;
  cursor: pointer;
  &:hover,
    &:focus{
        background-color: orange;
        font-weight: 500;
        box-shadow: 1px 4px 4px  #e7bc6d;
    }
`;

const Register = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("")

    const Navigate = useNavigate();
    //form refresh control
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try { 
            const res= await axios.post("/api/v1/auth/register",{name,email,phone,password});
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                Navigate('/login');
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
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input value={name} type="text" placeholder="name" onChange={(e)=> setName(e.target.value)} required/>
          <Input value={email}  type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} required/>
          <Input value={phone}  placeholder="phone"  onChange={(e)=> setPhone(e.target.value)} required/>
          <Input value={password} type="password"  placeholder="password" onChange={(e)=> setPassword(e.target.value)} required />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
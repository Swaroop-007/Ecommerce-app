
import { Facebook, Instagram, Room, Twitter,Phone,MailOutline } from "@mui/icons-material";
import styled from "styled-components";
  
  const Container = styled.div`
    display: flex;
    background-color: #11033ac5;
    color: white;
    
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    cursor: pointer;
    &:hover,
    &:focus{
        color: orange;
        font-weight: 500;
    }
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>PhoneX.</Logo>
          <Desc>
             @Copyrights 2023 PhoneX.
             All rights reserved.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter/>
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Android</ListItem>
            <ListItem>Iphones</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 008, JP Nagar , Bangalore-560062
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +91 0123456789
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> contact@PhoeniX.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;
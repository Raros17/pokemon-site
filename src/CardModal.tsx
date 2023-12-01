import styled from "styled-components";
import { closeModal } from "./store/modalSlice";
import { useDispatch } from "react-redux";

function CardModal(): JSX.Element {
  const dispatch = useDispatch();
    return   <>    
    <CardContainer>
        <Overlay onClick={() => dispatch(closeModal()) }/>
        <ContentSection>
          <QuitBtn onClick={() => dispatch(closeModal()) }>x</QuitBtn>
          <img src="/"></img>
          <h3>here pokemon name.</h3>
          <p>here pokemon detail.</p>
        </ContentSection>
    </CardContainer>
    </>
  }  
  export default CardModal;


 const CardContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  inset: 0;
  z-index: 999;
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;
const ContentSection = styled.section`
  position: fixed;
  width: 50%;
  height: 80%;
  background: ${({ theme }) => theme.color.cardBackground};
  padding: 5rem;
  border-radius: 30px;
  color: ${({ theme }) => theme.color.text};
  font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;  
  img {
    width: 100%;
    height: 30%;
    margin-top: 4rem;
  }
  h3 {
    font-size: 40px;
    font-weight: 600;    
    text-align: center;
  }
  p{
      font-size: 16px;
      margin-top: 2rem;
    }
`;

const QuitBtn = styled.button`
position: absolute;
top: 2rem;
right: 2rem;
width: 50px;
height: 50px;
border-radius: 50%;
background-color: #4185c2;
color: #fff;
font-size: 30px;
transition: all 0.2s ease;
&:hover {
  background-color: #84aed3;
  transition: all 0.2s ease;
}
&:active{
    background-color: #4185c2;
  }
`;
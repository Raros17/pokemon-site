import styled from "styled-components";
import { FaHome } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

function Sidebar() {
    return (<SidebarSection>
        <p><FaHome style={{fontSize:"35px"}}/></p>
        <p><GiPerspectiveDiceSixFacesRandom style={{fontSize:"35px"}}/></p>
        <p><FaRegStar style={{fontSize:"35px"}}/></p>
    </SidebarSection>
    )
  }  
  export default Sidebar;

  const SidebarSection = styled.section`
  height: 100%;
  width: 100px;
  position: absolute;
  left: 0;
  z-index: 99;
  background-color: ${({ theme }) => theme.color.sideBackground};
  display: flex;
  flex-direction: column;
  p{
    font-size: 20px;
    color: ${({ theme }) => theme.color.subText};
    margin: 15px 5px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    &:hover {
        background-color: #ffd864;
        border-radius: 20px;
        transition: all 0.2s ease;
    }
    &:active {
        background-color: #ecb205;
    }
  }  
`;
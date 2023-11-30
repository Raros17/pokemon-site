import styled from "styled-components";
import { BsSearch } from 'react-icons/bs';
import {FiMoon} from 'react-icons/fi'
import logoImage from './assets/image/pokemon_logo.png';
import { useDispatch } from "react-redux";
import { toggleTheme } from "./store/themeSlice";

function Nav() {
  const dispatch = useDispatch();
  
    return   <MenuNav>   
      <PokemonLogo/>
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
          <div style={{width: "100%",display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <InputArea>
                <input type="text" id="search-box" placeholder="Search some Awesome Pokemon!" ></input>
                <BsSearch style={{fontSize:"30px", color:"#4185c2", cursor:"pointer"}}/>
              </InputArea>
              <FilterArea>
                    <ul>
                        <li>Alphabet</li>
                        <li>Number</li>
                        <li>Random</li>
                    </ul>                    
              </FilterArea>
              <SelectLanguage>
                <option value="eng">ENG</option>
                <option value="kor">KOR</option>
              </SelectLanguage>
              <ThemeBtn onClick={() => dispatch(toggleTheme()) }><FiMoon style={{fontSize:"30px"}}/></ThemeBtn>
          </div>
      </div>
    </MenuNav>
  }
  
  export default Nav;

  const MenuNav = styled.section`
  background-color: ${({ theme }) => theme.color.backgroundSub};
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  width: 100%;
  height: 100px;
  color: #4185c2;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;    
    li {
        font-weight: 600;
        font-size: 23px;
        margin: 0 10px;
    }
  }
`;

const ThemeBtn = styled.button`
  color: #4185c2;
  padding: 5px;
  border: 3px solid #4185c2;
  border-radius: 50%;
  margin-left: 1rem;
  &:hover{
    background-color: #4185c2;
    transition: all 0.2s ease;
    color: #fff;
  }
  &:active{
    background-color: #2c587e;
  }
`;

const SelectLanguage = styled.select`
  width: 130px;
  height: 40px;
  font-size: 17px;
  text-align: center;
  border-radius: 5px;
  color: #555;
  cursor: pointer;
  border: 3px solid #4185c2 ;
  font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;   
`;

const PokemonLogo = styled.div`
 background-image: url(${logoImage});
 width: 300px;
 min-width: 200px;
 height: 90px; 
 background-repeat: no-repeat;
 background-position: center;
 background-size: cover;
`;

const InputArea = styled.section`
    width: 50%;
    min-width: 300px;
    display: flex;
    align-items: center;
    padding: 15px 0;
    padding-right: 10px;    
    input {
        color: #111;
        width: 80%;
        height: 45px;
        border-radius: 10px;
        font-size: 16px;
        padding: 0 20px;
        display: flex;
        margin: 0 10px;
        border: 3px solid #4185c2;     
        font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;   
    }
    input:focus{
      outline: none;    
      border-color: #4185c2;  
      box-shadow: 0 0 5px #5799d3;
    }
`;
const FilterArea = styled.section`
    display: flex;
    align-items: center;
    ul li {
    font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;
    cursor: pointer;
    margin: 0 2rem;
    font-size: 20px;
    &:hover{
      color:#5799d3;
      transition: all 0.3s ease;
    }
    }
`;
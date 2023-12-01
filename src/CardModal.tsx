import styled from "styled-components";
import { closeModal } from "./store/modalSlice";
import { useDispatch } from "react-redux";

interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  stats: Stat[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface CardModalProps {
  pokemon: PokemonDetail | null;
}

function CardModal({  pokemon }: CardModalProps): JSX.Element | null {
  const dispatch = useDispatch();

  console.log(pokemon)

  if (!pokemon) {
    return null;
  }
    return   <>    
    <CardContainer>
        <Overlay onClick={() => dispatch(closeModal()) }/>
        <ContentSection>
          <QuitBtn onClick={() => dispatch(closeModal()) }>x</QuitBtn>
          <div style={{display:"flex", justifyContent:"center"}}>
            <img src={pokemon.sprites.front_default}></img>
            <img src={pokemon.sprites.back_default}></img>          
            </div>
          <PokemonNumber># {pokemon.id}</PokemonNumber>
          <PokemonName>{pokemon.name}</PokemonName>
          <div style={{display:"flex", justifyContent:"center"}}>
            {pokemon.types.map((pokemonType, index) => (
              <SkillBtn key={index}>{pokemonType.type.name}</SkillBtn>
            ))}
          </div>
          <p>왜 없지....</p>
          <ShinySection>
            <img style={{width:'100px'}}src={pokemon.sprites.front_shiny}></img>
            <img style={{width:'100px'}}src={pokemon.sprites.back_shiny}></img>
          </ShinySection>
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

const ShinySection = styled.section`
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const PokemonNumber = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 0.1rem;
`
const PokemonName = styled.h3`
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`

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
    width: 30%;
    height: 50%;
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

const SkillBtn = styled.button`
  background-color: ${({ theme }) => theme.color.cardBtn};
  width: 100px;
  height: 25px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 2rem 1rem;
`;
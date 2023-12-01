import styled from "styled-components";
interface PokeData {
    name: string;
    imgUrl: string;
    type: PokemonType[]
    onClick: () => void;
  }

  interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }

function Card({name, imgUrl, type, onClick}: PokeData): JSX.Element {
    return   <>    
    <CardSection onClick={onClick}>
        <img src={`${imgUrl}`} alt='pokemon-img'/>
        <h2 id="pokemon-name">{name}</h2>
        <div style={{display:"flex", justifyContent:"space-between"}}>            
        {type.map((pokemonType, index) => (
            <SkillBtn key={index}>{pokemonType.type.name}</SkillBtn>
          ))}
        </div>
    </CardSection>
    </>
  }  
  export default Card;

const CardSection = styled.section`
  background-color: ${({ theme }) => theme.color.cardBackground};
  border-radius: 5px;
  width: 250px;
  height: 300px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;
  &:hover {
    transition: all 0.4s ease;
    transform: translateY(-6px);    
  }  
  &:active {
    transition: all 0.5s ease;
    transform: translateY(-6px); 
    transform:rotate3d(0, 1, 0, 180deg) ;
    }
  img {
    width: 100%;
    height: 65%;
    border: 1px solid #535353;
    border-radius: 5px;
  }
  h2 {
    font-weight: 800;
    font-size: 22px;
    padding: 1rem 0 0.5rem 0;
    text-align: center;
    color:${({ theme }) => theme.color.text};
  }
   p {
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    color: ${({ theme }) => theme.color.text};
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
  margin: 1rem 0;
`;
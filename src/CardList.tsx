import Card from "./Card";
import { openModal } from "./store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import CardModal from "./CardModal";

  interface CardListProps {
    detailData: PokemonDetail
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

  function CardList({ detailData }: CardListProps): JSX.Element {
    const {isOpen} = useSelector((store: RootState)=> store.modal);
    const dispatch = useDispatch();    
    let pokemons: PokemonDetail[] = [];  

    if (Array.isArray(detailData)) {
      pokemons = detailData;
    } else if (detailData) {
      pokemons = [detailData];
    }

    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {pokemons.map((pokemon: PokemonDetail, index: number) => (
        <Card
          key={index}
          name={pokemon.name}
          type={pokemon.types}
          imgUrl={pokemon.sprites.front_default}
          onClick={() => dispatch(openModal())}
        />
      ))}   
      {isOpen && <CardModal />}
      </div>
    );
  }

export default CardList;
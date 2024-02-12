import { useQuery } from "react-query";
import CardList from "./CardList";
import { getPoketmonDataApi } from "./getPoketDataApi";
import styled from "styled-components";
import getPoketDetailApi from "./getPoketDetailApi";
import { useEffect, useState } from "react";

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


function ShowPoketmonData(): JSX.Element {
   const [allPokemonDetailData, setAllPokemonDetailData] = useState<PokemonDetail[]>([]);
    const [pokeNum, setPokeNum] = useState(0);
    const [apiUrl, setApiUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    //   const selectedValue = parseInt(event.target.value, 10);
    //   setShowCard(selectedValue)
    //   setPokeNum(0);
    //   await setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=${selectedValue}&offset=0`);
    //   refetch()
    // }

    const handleObserver = async(entries:IntersectionObserverEntry[]) => {
      const target = entries[0];
      if(target.isIntersecting && !isLoadingMore){
        setIsLoadingMore(true);
        await nextPageUrl();
        setIsLoadingMore(false);    
      }
    }

    const nextPageUrl = () =>{
      const nextPokeList = pokeNum + 12;
      setPokeNum(nextPokeList);
      setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${nextPokeList}`)
    }

    useEffect(()=> {
       const observer = new IntersectionObserver(handleObserver, {threshold:0});  
       const observerTarget = document.getElementById("target");
       if(observerTarget){
        observer.observe(observerTarget);
       }
       console.log(observerTarget)
       return () => {
        observer.disconnect();
       }
      }, []);
   
    //setApiUrl은 비동기로 동작하지 않으므로 refetch가 호출되기 전에 apiUrl이 업데이트되지 않을 수 있습니다.
    //async await로 refetch()실행. setApiUrl이 완료될 때까지 기다린 후에 refetch를 호출



    const {isLoading, isError, data: pokemonData} = useQuery({
      queryKey: ['pokemonsDataList'],
      queryFn: ()=> getPoketmonDataApi(apiUrl),
      staleTime: 100,
      cacheTime: 50000, 
      refetchOnWindowFocus: false,
    })

    const namesArray: string[] = pokemonData?.results?.map((pokemon : {name: string})=>pokemon.name) || [];

    const { isLoading: detailLoading, isError: detailError, data: newPokemonDetailData } = useQuery<PokemonDetail[], Error>({
      queryKey: ['pokemonsDetailList', namesArray],
      //이 부분 아직 헷갈림.....
      queryFn: () => {
        if (namesArray.length > 0) {
          return Promise.all(namesArray.map((name) => getPoketDetailApi(`https://pokeapi.co/api/v2/pokemon/${name}`)))
        } else {
          return Promise.resolve([]);
        }
      }
    });

    useEffect(()=>{
      if(!detailLoading&& newPokemonDetailData){
        setAllPokemonDetailData((prevData)=>[...prevData, ...newPokemonDetailData])
      }
    }, [detailLoading, newPokemonDetailData])

    if (isLoading || detailLoading || isLoadingMore) return (
    <LoadingSection>
      <img src="./src/assets/image/loading_img.gif"></img>
      </LoadingSection>
    )

    if (isError || detailError) return <span>Error! 데이터를 받아오는데 문제가 발생했습니다.</span>
    return (
      <>
        <section style={{width: "100%"}}>
          <CardList detailData={allPokemonDetailData}></CardList>
          <div style={{backgroundColor:"red", height: "80px", width:"100%"}} id="target"></div>
        </section>
      </>      
    )  
  }

  export default ShowPoketmonData;


const LoadingSection = styled.section`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
img{
  height: 20%;
}
`;

const SelectCardNum = styled.select`
  position: absolute;
  top: 120px;
  right: 120px;
  width: 130px;
  height: 25px;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  color: #555;
  cursor: pointer;
  border: 3px solid #a9d5fb ;
  font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;   
`;

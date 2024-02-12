import { useQuery } from "react-query";
import CardList from "./CardList";
import { getPoketmonDataApi } from "./getPoketDataApi";
import styled from "styled-components";
import getPoketDetailApi from "./getPoketDetailApi";
import {useEffect, useState } from "react";

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
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

interface PokemonDetailData {
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
    const [allPokemonData, setAllPokemonData] = useState<PokemonData[]>([])
    const [allPokemonDetailData, setAllPokemonDetailData] = useState<PokemonDetailData[]>([]);
    const [pokeNum, setPokeNum] = useState(0);
    const [apiUrl, setApiUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(apiUrl)
    console.log(pokeNum)
    console.log("allPokemondata", allPokemonData)

    useEffect(()=> {
      const handleObserver = async(entries:IntersectionObserverEntry[]) => {
      const target = entries[0];
      if(target.isIntersecting && !isLoadingMore){
        setIsLoadingMore(true);
        nextPageUrl();
        setIsLoadingMore(false)
      }
    }         

    const nextPageUrl = ()=>{
      const nextPokeList = pokeNum + 12;
      setPokeNum(nextPokeList);
      setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${nextPokeList}`)
    }

    const observer = new IntersectionObserver(handleObserver, {threshold:0});  
       const observerTarget = document.getElementById("target");
       if(observerTarget){
        observer.observe(observerTarget);
       }
       return () => {
        observer.disconnect();
       }
      }, [pokeNum, isLoadingMore, apiUrl]);
   

    const {isLoading, isError, data: pokemonData} = useQuery({
      queryKey: ['pokemonsDataList'],
      queryFn: ()=> getPoketmonDataApi(apiUrl),
      staleTime: 100,
      cacheTime: 50000, 
      refetchOnWindowFocus: false,
    })

    useEffect(()=>{
      if(!isLoading&&pokemonData){
        setAllPokemonData((prevData)=> [...prevData, pokemonData])
      }
    }, [isLoading, pokemonData])



    const namesArray: string[] = allPokemonData.filter(data => data && data.results).flatMap(data => data.results.map((pokemon: Pokemon) => pokemon.name)) || [];
    console.log(namesArray)
   
    const { isLoading: detailLoading, isError: detailError, data: pokemonDetailData } = useQuery<PokemonDetailData[], Error>({
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
      if(!isLoading && pokemonData){
        setAllPokemonData((prevData)=>[...prevData, pokemonData])
      }
    }, [isLoading, pokemonData]);

    useEffect(()=>{
      if(!detailLoading && pokemonDetailData){
        setAllPokemonDetailData((prevData)=>[...prevData, ...pokemonDetailData])
      }
    }, [detailLoading, pokemonDetailData])
    
    useEffect(() => {
      if (!detailLoading && pokemonDetailData) {
        setAllPokemonDetailData((prevData) => [...prevData, ...pokemonDetailData]);
      }
    }, [detailLoading, pokemonDetailData, namesArray]);

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
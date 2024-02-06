import { useQuery } from "react-query";
import CardList from "./CardList";
import { useState } from "react";
import { getPoketmonDataApi } from "./getPoketDataApi";
import { BiLeftArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';
import styled from "styled-components";
import getPoketDetailApi from "./getPoketDetailApi";

function ShowPoketmonData(): JSX.Element {
    const [pokeNum, setPokeNum] = useState(0);
    const [showCard, setShowCard] = useState(12);
    const [apiUrl, setApiUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${showCard}&offset=0`);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = parseInt(event.target.value, 10);
      setShowCard(selectedValue)
      setPokeNum(0);
      await setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=${selectedValue}&offset=0`);
      refetch()
    }
    //setApiUrl은 비동기로 동작하지 않으므로 refetch가 호출되기 전에 apiUrl이 업데이트되지 않을 수 있습니다.
    //async await로 refetch()실행. setApiUrl이 완료될 때까지 기다린 후에 refetch를 호출

    const nextPageUrl = () =>{
      const nextPokeList = pokeNum + showCard;
      setPokeNum(nextPokeList);
      setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=${showCard}&offset=${nextPokeList}`)
    }

    const beforePageUrl = () =>{
      const beforePokeList = pokeNum - showCard;
      if (beforePokeList >= 0) {
        setPokeNum(beforePokeList);
        setApiUrl(`https://pokeapi.co/api/v2/pokemon?limit=${showCard}&offset=${beforePokeList}`);
      } else if(beforePokeList<0){
        alert('첫번째 페이지입니다!')
      }
    }

    const {isLoading, isError, data: pokemonData, refetch} = useQuery({
      queryKey: ['pokemonsDataList'],
      queryFn: ()=> getPoketmonDataApi(apiUrl),
      staleTime: 100,
      cacheTime: 5000, 
      refetchOnWindowFocus: false,
    })

    const namesArray: string[] = pokemonData?.results?.map((pokemon : {name: string})=>pokemon.name) || [];

    const { isLoading: detailLoading, isError: detailError, data: pokemonDetailData } = useQuery({
      queryKey: ['pokemonsDetailList', namesArray],
      //이 부분 아직 헷갈림.....
      queryFn: () => {
        if (namesArray.length > 0) {
          return Promise.all(namesArray.map((name) => getPoketDetailApi(`https://pokeapi.co/api/v2/pokemon/${name}`)))
        } else {
          return Promise.resolve([]);
        }
      },
    });
    if (isLoading || detailLoading) return (
    <LoadingSection>
      <img src="./src/assets/image/loading_img.gif"></img>
      </LoadingSection>
    )

    if (isError || detailError) return <span>Error! 데이터를 받아오는데 문제가 발생했습니다.</span>

    return (
      <>
        <SelectCardNum value={showCard} onChange={handleSelectChange}>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
        </SelectCardNum>
        <PageBtn onClick={() => { beforePageUrl(); refetch()}}><BiLeftArrow/></PageBtn>
        <CardList detailData={pokemonDetailData}></CardList>
        <PageBtn onClick={() => { nextPageUrl(); refetch()}}><BiRightArrow/></PageBtn>
      </>      
    )  
  }

  export default ShowPoketmonData;


  const PageBtn = styled.button`
  width: 80px;
  border-radius: 10px;
  height: 80px;
  align-items: center;
  color: #fff;
  font-size: 50px;
  margin-top: 300px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #86beff;
    transition: all 0.3s ease;
  }
`;

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

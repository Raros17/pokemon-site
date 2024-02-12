import ShowPoketmonData from "./ShowPoketmonData";
import Nav from "./Nav"
import styled, {ThemeProvider} from "styled-components";
import { QueryClient, QueryClientProvider} from "react-query";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import {dark, light} from "./styles/theme"
import GlobalStyles from "./styles/GlobalStyles";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
function App() {
  interface PokeListInterface {
    //인터페이스 정의
  }
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pokeListArr, setPokeListArr] = useState<PokeListInterface[]>([]);
  
  const handleObserver = (entries) => {
    const target = entries[0];
    if(target.isIntersecting && !isLoading){
      setPage((prevPage)=> prevPage +1);
    }
  }
  useEffect(()=> {
     const observer = new IntersectionObserver(handleObserver);  
     const observerTarget = document.getElementById("target");
     if(observerTarget){
      observer.observe(observerTarget);
     }

  console.log(observerTarget)
     return () => {
      observer.disconnect();
     }
    }, []);
 

  const isDarkTheme = useSelector((state: RootState) => state.theme.darkTheme);
  const theme = isDarkTheme ? dark : light;
  return <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
    <GlobalStyles />
  <section id="home-section" style={{height:"100%", position:"relative"}}>    
    <Nav/>
    <Sidebar/>
    <CardListSection >
      <ShowPoketmonData/>
    </CardListSection>        
  <div style={{backgroundColor:"red", height: "80px", width:"100%"}} id="target"></div>
  </section>
  
  </ThemeProvider>
  </QueryClientProvider>
  
}
export default App;

const CardListSection = styled.section`
  padding: 50px 20px 150px 150px;
  display: flex;
`;

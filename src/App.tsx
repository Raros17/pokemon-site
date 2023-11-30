import ShowPoketmonData from "./ShowPoketmonData";
import Nav from "./Nav"
import styled, {ThemeProvider} from "styled-components";
import { QueryClient, QueryClientProvider} from "react-query";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import {dark, light} from "./styles/theme"

const queryClient = new QueryClient();

function App() {
  const theme = useSelector((state: RootState) => state.theme.darkTheme);
  return <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme ? dark : light}>
  <section id="home-section" style={{height:"100%", position:"relative", backgroundColor:"red"}}>    
    <Nav/>
    <Sidebar/>
    <CardListSection >
      <ShowPoketmonData/>
    </CardListSection>    
  </section>
  </ThemeProvider>
  </QueryClientProvider>
}
export default App;

const CardListSection = styled.section`
  padding: 50px 50px 150px 150px;
  background-color: #4185c2;
  height: 100%;
  width: 100%;
  display: flex;
`;

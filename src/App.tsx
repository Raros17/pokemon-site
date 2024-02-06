import ShowPoketmonData from "./ShowPoketmonData";
import Nav from "./Nav"
import styled, {ThemeProvider} from "styled-components";
import { QueryClient, QueryClientProvider} from "react-query";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import {dark, light} from "./styles/theme"
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

function App() {
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
  </section>
  </ThemeProvider>
  </QueryClientProvider>
}
export default App;

const CardListSection = styled.section`
  padding: 50px 20px 150px 150px;
  display: flex;
`;

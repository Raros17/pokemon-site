import GetPoketmonData from "./GetPoketmonData";
import Nav from "./Nav"
import styled from "styled-components";
import { QueryClient, QueryClientProvider} from "react-query";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import CardModal from "./CardModal";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function App() {
  const {isOpen} = useSelector((store)=> store.modal);
  return <QueryClientProvider client={queryClient}>
  <section id="home-section" style={{height:"100%", position:"relative", backgroundColor:"red"}}>    
    <Nav/>
    <Sidebar/>
    <CardListSection >
      <GetPoketmonData/>
        {isOpen &&<CardModal />}
    </CardListSection>
    <Pagination/>
  </section>
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


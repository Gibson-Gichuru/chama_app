import Nav from "./components/Navigation";
import Main from "./components/MainContent";
import Notifications from "./components/Notify";
import {Box} from "@mui/material";
function App() {

  return (
  
      <Box>
        <Nav/>
        <Main></Main>
        <Notifications/>
      </Box>
  );
}

export default App;

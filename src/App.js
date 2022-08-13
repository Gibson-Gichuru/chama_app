import Nav from "./components/Navigation";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import {Box} from "@mui/material";
import NavItem from "./components/NavItem";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {navigationLinks} from "./data/navdata";

function App() {

  return (
  
      <Box>
        <Nav/>
        <Routes>
          <Route path="/" element={<Protected><Home/></Protected>}/>
          <Route path="/reset/password/:userToken" element={<ResetPassword/>}/>
          <Route path="/account/confirm/:userToken" element={<ConfirmAccount/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
          {navigationLinks.map((item,index)=>(
            <Route path={`${item.title.toLowerCase()}`} element={<NavItem item={item}/>}/>
          ))}
        </Routes>
      </Box>
  );
}

export default App;

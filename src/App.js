import Nav from "./components/Navigation";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import {Box} from "@mui/material";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
function App() {

  return (
  
      <Box>
        <Nav/>
        <Routes>
          <Route path="/" element={<Protected><Home/></Protected>}/>
          <Route path="/reset/password/:userToken" element={<ResetPassword/>}/>
          <Route path="/account/confirm/:userToken" element={<ConfirmAccount/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Box>
  );
}

export default App;

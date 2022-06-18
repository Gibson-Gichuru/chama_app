import "./styles/App.css";

import {Routes, Route} from "react-router-dom"
import Nav from "./components/Navigation";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import {Header} from "./components/Utils";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Faqs from "./pages/Faqs";

function App() {

  return (
  
      <>
      <Header>
        <Nav/>
      </Header>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path="login" element = {<Login/>}/>
        <Route path="signup" element = {<SignUp/>}/>
        <Route path="about" element = {<About/>}/>
        <Route path="contacts" element = {<Contacts/>}/>
        <Route path="faqs" element = {<Faqs/>}/>
      </Routes>
      </>
  );
}

export default App;

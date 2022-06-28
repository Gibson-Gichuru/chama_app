import "./styles/App.css";

import {Routes, Route} from "react-router-dom"
import Nav from "./components/Navigation";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import {Header} from "./components/Utils";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Faqs from "./pages/Faqs";
import { ProtectedComponent } from "./components/Utils";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  return (
  
      <>
      <Header>
        <Nav/>
      </Header>
      <ReactNotifications />
      <Routes>
        <Route path = "/" element = {
          <ProtectedComponent>
              <Home/>
          </ProtectedComponent>
        }/>
      
        <Route path="login" element = {<Login/>}/>
        <Route path="signup" element = {<SignUp/>}/>
        <Route path="about" element = {<About/>}/>
        <Route path="contacts" element = {<Contacts/>}/>
        <Route path="faqs" element = {<Faqs/>}/>
        <Route path ="forgot_password" element = {<ForgotPassword/>}/>
      </Routes>
      </>
  );
}

export default App;

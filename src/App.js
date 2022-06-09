import "./styles/App.css";

import {Routes, Route} from "react-router-dom"
import Nav from "./components/Navigation";
function App() {
  return (
  
      <>
      <Nav/>
      <Routes>
        <Route path = "/"/>
      </Routes>
      </>
  );
}

export default App;

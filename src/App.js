import "./styles/App.css";

import {Routes, Route} from "react-router-dom"
import Nav from "./components/Navigation";
import LoginForm from "./components/Login";
import {ShadowContextProvider} from "./context/ShadowContext";
import { ViewPortContextProvider } from "./context/ViewPort";

import { useViewport } from "./context/ViewPort";

function App() {


  const {width} = useViewport()

  return (
  
      <>
      <ViewPortContextProvider>
        <ShadowContextProvider>
        <header className="header">
          <Nav/>
        </header>
          <main className="main">
            <div className="banner--form flex">
              <div className="banner">
                  <img src={width < 846 ?"mobile-bg.svg": "big-bg.svg"} alt="savings" className="banner--img" />
              </div>
              <LoginForm/>  
            </div>   
          </main>
          
        </ShadowContextProvider>
      </ViewPortContextProvider>
      <Routes>
        <Route path = "/"/>
      </Routes>
      </>
  );
}

export default App;

import { NavLinksData } from "./NavbarData";
import {IoGrid} from "react-icons/io5";
import { NavLink } from "react-router-dom";

import { useState } from "react";

import { IconContext } from "react-icons";

const Nav = ()=> {

    const [toggle, setToggle] = useState(false)

    const showNavBar = ()=> setToggle(!toggle);
    return (
        
       <header className="header">
           <div className="container">
            <IconContext.Provider value={"#00204C"}>
                <nav className="nav flex">
                    <img src="brand.svg" alt="chama app Logo" className="brand-logo" />
                    <div className="cta-group ">
                        <button className="cta-btn primary btn">Sign In</button>
                        <button className="cta-btn secondary btn">Sign Up</button>
                    </div>

                    <button className="btn nav--toggle" onClick={showNavBar}>
                        <IoGrid/>
                    </button>
                    <div className={ toggle ? "nav-content flex toggle--on" : "nav-content flex"}>
                    
                        <ul className="nav-links flex">
                            {NavLinksData.map((item, index)=>{

                                return(
                                <li className="nav-link" key = {index}>
                                    <NavLink to = {item.path} className = {`${item.cName} flex--inline`}>
                                            {item.icon}
                                            {item.title}
                                    </NavLink>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
               </IconContext.Provider>
           </div>
       </header>
    )
}


export default Nav;
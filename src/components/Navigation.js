import { NavLinksData } from "./NavbarData";
import {IoGrid} from "react-icons/io5";
import { NavLink } from "react-router-dom";

import { useState, useContext} from "react";

import { IconContext } from "react-icons";

import { ShadowContext } from "../context/ShadowContext";

import Shadow from "./Shadow";

const Nav = ()=> {

    const [toggle, setToggle] = useState(false)

    const {visibilityOn} = useContext(ShadowContext);

    const showNavBar = () =>{

        setToggle(!toggle)
        visibilityOn()
    }

    return (
        
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
                <Shadow styleClass="nav-barshadow" onClassName= "nav-barshadow_on" offClassName="nav--barshadow_off">
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
                </Shadow>
            </nav>
            </IconContext.Provider>
        </div>
       
    )
}


export default Nav;
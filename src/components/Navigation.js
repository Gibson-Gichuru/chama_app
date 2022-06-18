import { NavLinksData } from "../utilities/NavbarData";
import {IoGrid} from "react-icons/io5";
import { NavLink } from "react-router-dom";

import { useState, useContext} from "react";

import { ShadowContext } from "../context/ShadowContext";

import {Shadow} from "./Utils";

const Nav = ()=> {

    const [toggle, setToggle] = useState(false)

    const {visibilityOn} = useContext(ShadowContext);

    const showNavBar = () =>{

        setToggle(!toggle)
        visibilityOn()
    }

    return (
        
        <div className="container">
            <nav className="nav flex">
                <img src="brand.svg" alt="chama app Logo" className="brand-logo" />
                <div className="cta-group ">
                    <NavLink to = "login" className="cta-btn primary btn">Sign In</NavLink>
                    <NavLink to = "signup"className="cta-btn secondary btn">Sign Up</NavLink>
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
                                    <NavLink to = {item.path} className = {`${item.cName} flex--inline`} onClick ={showNavBar}>
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
        </div>
       
    )
}


export default Nav;
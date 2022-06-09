import * as AiFill from "react-icons/ai";
import * as BsIcons from "react-icons/bs"
import * as IoIcons from "react-icons/io"
export const NavLinksData = [
    {
        title: "Home",
        path: "/",
        icon: <AiFill.AiFillHome/>,
        cName: "link-text"
    },
    {
        title: "About",
        path: "/about",
        icon: <BsIcons.BsInfoSquareFill/>,
        cName: "link-text"
    },
    {
        title: "Contacts",
        path: "/contacts",
        icon: <IoIcons.IoMdMail/>,
        cName: "link-text"
    },
    {
        title: "Faqs",
        path: "/faqs",
        icon: <BsIcons.BsFillQuestionSquareFill/>,
        cName: "link-text"
    }
]
import * as BsIcons from "react-icons/bs"

const Notify = (message, styleClass)=>{


    return(

        <div className={`notification ${styleClass}`}>
            <BsIcons.BsFillBellFill/>
            <p className="notification--text">
                {message}
            </p>
        </div>
    )
}

export default Notify
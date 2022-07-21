import { Main } from "../components/Utils";
import { Store } from "react-notifications-component";

const Confirm = ()=>{

    const handleClick = ()=> Store.addNotification({

        title:"Account Activation",
        message:"A link have been sent to your mail box",
        type:"info",
        insert:"top",
        container:"top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    
    })

    return (

        <Main>
            <div className="confirm--container">
                <div className="container flex confirm--text">
                    <p> your account is not confirmed check your mail box for the confirmation link</p>
                    <button className="btn btn--primary" onClick={handleClick}>Resend the Link</button>
                </div>
            </div>
        </Main>
    )
}

export default Confirm
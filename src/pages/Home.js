import { Main } from "../components/Utils";
import * as BsIcon from "react-icons/bs";
import * as GrIcon from "react-icons/gr";
import * as TIcons from "react-icons/ti";

const Home = ()=> {

    return (

        <Main>
            <div className="home">
                <div className="card--wrapper flex">
                    <div className="card card--cash savings">
                        <p className="card--cash_text flex--text">
                            <span className="currency">Ksh.</span>
                            20000
                        </p>
                    </div>
                    <div className="card card--cash loan">
                        <p className="card--cash_text flex--text">
                            <span className="currency">Ksh.</span>
                            20000
                        </p>
                    </div>
                </div>
                <div className="transactions">

                    <div className="transactions--deco flex">
                    <GrIcon.GrTransaction/>
                    <p>Recent Transactions</p>
                    </div>
                    <div className="transactions--card flex">
                        <div className="flex--text">
                            <BsIcon.BsCalendar2CheckFill/>
                            <p className="transaction--date">
                                24th Feb 2022
                            </p>
                        </div>
                        <p className="transactions--amount">500</p>
                    </div>
                </div>  
            </div>

            <div className="floating--btn">
                <TIcons.TiHome/>
            </div>
        </Main> 
    )
}

export default Home

import Main from "../components/MainContainer";
import Forms from "../components/Forms";
import {checkIsExpired} from "../utilities/AppUtils";
import {connect} from "react-redux";

const Protected = ({children, access})=>{

    if( access && !checkIsExpired(access)){

        return <>{children}</>
    }
    return <Main><Forms/></Main>
}

const mapStateToProp = state=>{

    return {

        access: state.user.tokens.access,
    }
}

export default connect(mapStateToProp)(Protected) 
import {checkIsExpired} from "../utilities/AppUtils";
import {connect} from "react-redux";

const Hidden = ({children, access})=>{

    if (access && !checkIsExpired(access)){
        return<>{children}</>
    }

    return null
}

const mapStateToProp = state=>{

    return {
        access: state.user.tokens.access
    }
}

export default connect(mapStateToProp, undefined)(Hidden) 
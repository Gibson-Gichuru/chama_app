import {combineReducers} from "redux"

import messageReducer from "./Message/MessageReducer";
import alertReducer from "./Alert/AlertReducer";
import userReducer from "./User/UserReducer";

const rootReducer = combineReducers({
    alerts:alertReducer,
    messages:messageReducer,
    user:userReducer,
})


export default rootReducer
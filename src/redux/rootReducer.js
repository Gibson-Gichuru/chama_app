import {combineReducers} from "redux"

import messageReducer from "./Message/MessageReducer";
import alertReducer from "./Alert/AlertReducer";
import userReducer from "./User/UserReducer";
import dialogReducer from "./Dialog/DialogReducer";

const rootReducer = combineReducers({
    alerts:alertReducer,
    messages:messageReducer,
    user:userReducer,
    dialog:dialogReducer,
})


export default rootReducer
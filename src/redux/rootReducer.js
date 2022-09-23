import {combineReducers} from "redux"

import messageReducer from "./Message/MessageReducer";
import alertReducer from "./Alert/AlertReducer";


const rootReducer = combineReducers({
    alerts:alertReducer,
    messages:messageReducer
})


export default rootReducer
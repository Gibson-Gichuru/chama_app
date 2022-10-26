import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import savetoSessionStorage from "./middleWares/SaveUser";
import {composeWithDevTools} from "redux-devtools-extension"

const middleWaresEnhancer = applyMiddleware(
    savetoSessionStorage
)
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(middleWaresEnhancer),  
)


export default store

import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import savetoSessionStorage from "./middleWares/SaveUser";

const middleWaresEnhancer = applyMiddleware(
    savetoSessionStorage
)
const store = createStore(
    rootReducer,
    {},
    middleWaresEnhancer
)


export default store

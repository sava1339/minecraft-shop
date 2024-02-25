import {combineReducers,createStore} from 'redux'
import {serverDataReducer} from "./reduce/serverDataReducer";
import {mainDataReducer} from "./reduce/mainDataReducer";
import {filterReducer} from "./reduce/filterReducer";
import {idNameReducer} from "./reduce/idNameReducer";
import {productReducer} from "./reduce/productReducer";
import {basketReducer} from "./reduce/basketReducer";
import {userReducer} from "./reduce/userReducer";
import {lastBuyingsReducer} from "./reduce/lastBuyingsReducer";
const rootReducers = combineReducers({
    serverData:serverDataReducer,
    mainData:mainDataReducer,
    filter:filterReducer,
    nameList:idNameReducer,
    product:productReducer,
    basket:basketReducer,
    user:userReducer,
    buyings:lastBuyingsReducer
})

export const store = createStore(rootReducers)
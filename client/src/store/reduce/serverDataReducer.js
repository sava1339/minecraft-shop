import {FETCH_SERVER_DATA} from "../actionTypes";
import {useSelector} from "react-redux";
import axios from "axios";
import {$client} from "../../http";

const initialState = {
    online: 0
}
export const serverDataReducer = (state = initialState,action)=>{
    switch (action.type) {
        case FETCH_SERVER_DATA:
            return {...state, online: action.data}
        default:
            return state
    }
}
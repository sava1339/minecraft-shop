import {FETCH_MAIN_DATA} from "../actionTypes";

const initialState = {
    data:{}
}
export const mainDataReducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_MAIN_DATA:
            return {...state,data:action.data}
        default:
            return state
    }
}
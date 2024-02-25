import {FETCH_LAST_BUYINGS} from "../actionTypes";

const initialState = {
    buyings:[]
}
export const lastBuyingsReducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_LAST_BUYINGS:
            return {...state,buyings: action.data}
        default:
            return state
    }
}

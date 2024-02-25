import {FETCH_SERVER_TYPE_NAMES} from "../actionTypes";

const initialState = {
    serverNames:[],
    typeNames:[]
}
export const idNameReducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_SERVER_TYPE_NAMES:
            return {...state,serverNames: action.serverList, typeNames: action.typeList}
        default:
            return state
    }
}
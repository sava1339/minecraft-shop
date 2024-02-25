import {SET_USER_AUTH} from "../actionTypes";

const initialState = {
    userIsAuth: false
}
export const userReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SET_USER_AUTH:
            return {...state,userIsAuth: action.data}
        default:
            return state
    }
}
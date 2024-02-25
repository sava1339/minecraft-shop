import {FETCH_FILTERS, SET_ACTIVE_SERVER, SET_SERVER_FILTER, SET_TYPE_FILTER} from "../actionTypes";

const initialState = {
    servers:[],
    types:[],
    activeFilters:{
        server:1,
        type:0
    }
}
export const filterReducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_FILTERS:
            return {
                ...state,
                servers: action.servers,
                types: action.types,
                ...state.activeFilters
            }
        case SET_SERVER_FILTER:
            return {...state,activeFilters:{...state.activeFilters,server: +action.data}}
        case SET_TYPE_FILTER:
            return {...state,activeFilters:{...state.activeFilters,type: +action.data}}
        default:
            return state
    }
}
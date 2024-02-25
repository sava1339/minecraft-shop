import {ADD_PRODUCT_IN_BASKET, SET_SELECT_SERVER, REMOVE_PRODUCT_IN_BASKET,REMOVE_PRODUCT_IN_BASKET_ID} from "../actionTypes";

const initialState  = {
    basket: [],
    fullPrice:0,
    selectServer:0
}
export const basketReducer = (state = initialState,action)=>{
    const index = state.basket.findIndex(prod => prod.id === action.id )
    switch (action.type) {
        case ADD_PRODUCT_IN_BASKET:
            const data = JSON.parse(JSON.stringify(action.data))
            data.value = action.value
            return {
                ...state,
                basket: [
                    ...state.basket,
                    data
                ],
                fullPrice: state.fullPrice + (data.price * action.value),
                selectServer: state.selectServer
            }
        case REMOVE_PRODUCT_IN_BASKET:
            return {
                ...state,
                basket: [
                    ...state.basket.slice(0,index),
                    ...state.basket.slice(index+1)
                ],
                fullPrice: state.fullPrice - action.price,
                selectServer: state.selectServer
            }
        case REMOVE_PRODUCT_IN_BASKET_ID:
            const value = state.basket[index].value
            return {
                ...state,
                basket: [
                    ...state.basket.slice(0,index),
                    ...state.basket.slice(index+1)
                ],
                fullPrice: state.fullPrice - (action.price*value),
                selectServer: state.selectServer
            }
        case SET_SELECT_SERVER:
            return {
                ...state,
                basket: state.basket,
                fullPrice: state.fullPrice,
                selectServer: action.data
            }
        default:
            return state
    }
}
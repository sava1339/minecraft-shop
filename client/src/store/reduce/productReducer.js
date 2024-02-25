import {FETCH_PRODUCTS,SET_DISABLE} from "../actionTypes";

const initialState = {
    products:[]
}
export const productReducer = (state = initialState,action)=>{
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {...state,products:action.data}
        case SET_DISABLE:
            const index = state.products.findIndex(prod => prod.id === action.id )
            const product = JSON.parse(JSON.stringify(state.products[index]))
            product.disab = action.disab
            return{
                ...state,
                products: [
                    ...state.products.slice(0,index),
                    product,
                    ...state.products.slice(index+1)
                ]
            }
        default:
            return state
    }
}
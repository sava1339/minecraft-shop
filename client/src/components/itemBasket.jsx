import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_PRODUCT_IN_BASKET, SET_DISABLE, SET_SELECT_SERVER} from "../store/actionTypes";
import {serverURL} from "../http";

const ItemBasket = ({id,image,price,name,value,count}) => {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket)
    const delItem = (id,price)=>{
        if(basket.basket.length === 1){
            dispatch({type:SET_DISABLE, disab: false,id:id })
            dispatch({type:REMOVE_PRODUCT_IN_BASKET,id:id,price:price,value:value})
            dispatch({type:SET_SELECT_SERVER,data:0})
        }else{
            dispatch({type:SET_DISABLE, disab: false,id:id })
            dispatch({type:REMOVE_PRODUCT_IN_BASKET,id:id,price:price,value:value})
        }
    }
    return (
        <div className="p-2 w-full my-2 shadow-md rounded flex flex-nowrap items-center flex-between">
            <img className="h-[96px] w-[96px] mr-4" src={serverURL+image} alt=""/>
            <div className="text-content w-full border-l-2 border-zinc-900 pl-2 flex flex-col justify-between">
                <p className="basket-item-name text-zinc-900 text-[21px]">{name}</p>
                <div className="basket-item-content flex justify-between items-center">
                    <p className="basket-item-price text-zinc-800 text-[16px]">{price*value} руб</p>
                    <p className="basket-item-value text-zinc-800 text-[16px]">Количество: {value*count}</p>
                    <button onClick={()=>delItem(id,price*value)} className="transition bg-zinc-50 text-zinc-900 rounded px-4 py-1 hover:bg-zinc-900 hover:text-zinc-50">Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default ItemBasket;
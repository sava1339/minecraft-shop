import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {serverURL} from "../http";
import {REMOVE_PRODUCT_IN_BASKET_ID, SET_DISABLE, SET_SELECT_SERVER} from "../store/actionTypes";

const DonateCard = ({id, name, price,count, image,disableFunc, serverId, typeId,value=0,writeLocalStorage, max}) => {
    const nameList = useSelector(state => state.nameList)
    const product = useSelector(state => state.product)
    const basket = useSelector(state => state.basket)
    const dispatch = useDispatch()
    const index = product.products.findIndex(prod => prod.id === id)
    const nameServerIndex = nameList.serverNames.findIndex(name => name.id === serverId)
    const nameTypeIndex = nameList.typeNames.findIndex(name => name.id === typeId)
    const delItem = ()=>{
        if(basket.basket.length === 1){
            dispatch({type:SET_DISABLE, disab: false,id:id })
            dispatch({type:REMOVE_PRODUCT_IN_BASKET_ID,id:id,price:price})
            dispatch({type:SET_SELECT_SERVER,data:0})
        }else{
            dispatch({type:SET_DISABLE, disab: false,id:id })
            dispatch({type:REMOVE_PRODUCT_IN_BASKET_ID,id:id,price:price})
        }
    }
    return (
        <div className="bg-zinc-700 p-4 flex flex-col justify-center items-center text-center rounded">
            <div className="top-content flex flex-col items-center justify-center">
                <div className="flex justify-between w-full">
                    <p className="text-gray-400 text-[14px]">{nameList.serverNames[nameServerIndex].name}</p>
                    <p className="text-gray-400 text-[14px]">{nameList.typeNames[nameTypeIndex].name}</p>
                </div>
                    {value ?
                        <img
                            onClick={()=>writeLocalStorage(id,name,price,value,image,max)}
                            className="my-2 w-[192px] h-[192px] hover:cursor-pointer" src={serverURL+image} alt=""/>
                        :
                        <img
                            className="my-2 w-[192px] h-[192px]" src={serverURL+image} alt=""/>
                    }
            </div>
            <div className="text-content ">
                <p className="text-[#ffffff] text-[17px]">{name} x{count}</p>
            </div>
            <div className="flex w-full justify-center w-full mt-2 items-center">
                {product.products[index].disab?
                    <button onClick={delItem} className=" front-[500] text-[16px] bg-zinc-600 text-zinc-300 rounded px-4 py-[0.3rem]">Уже в корзине</button>
                    :
                    <div>
                        {value ?
                            <button onClick={()=>writeLocalStorage(id,name,count,price,value,image,max)}
                                    className="transition flex items-center front-[500] text-[18px] bg-zinc-50 text-zinc-900 rounded px-4 py-[0.3rem] mt-1 hover:bg-zinc-900 hover:text-zinc-50">{price} ₽
                            <svg className="w-[32px] ml-[1em]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11.01V11M16 11.01V11M8 8V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V8M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718 9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H17.8264C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M8 8H16" stroke="#4f4f4f"></path> </g></svg>
                            </button>
                            :
                            <button onClick={()=> {
                                disableFunc(id)
                            }} className="transition flex items-center front-[500] text-[18px] bg-zinc-50 text-zinc-900 rounded px-4 py-[0.3rem] mt-1 hover:bg-zinc-900 hover:text-zinc-50">{price} ₽
                            <svg className="w-[32px] ml-[1em]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M8 11.01V11M16 11.01V11M8 8V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V8M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718 9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H17.8264C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M8 8H16" stroke="#4f4f4f"></path> </g></svg>
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default DonateCard;
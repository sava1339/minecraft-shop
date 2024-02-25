import React, { useState} from 'react';
import {useSelector} from "react-redux";
import {serverURL} from "../http";

const ProductInfo = ({closeBasket,disableFunc}) => {
    const [value,setValue] = useState(1)
    const product = useSelector(state => state.product)
    const name = localStorage.getItem("productName")
    const price = localStorage.getItem("productPrice")
    const image = localStorage.getItem("productImage")
    const max = localStorage.getItem("productMax")
    const count = localStorage.getItem('productCount')

    const onChangeInput = ()=> {
        const input = document.querySelector('input')
        let value = (input.value-input.min)/(input.max-input.min)*100
        input.style.background = 'linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ' + value + '%, gray ' + value + '%, gray 100%)'
    };
    const index = product.products.findIndex(prod => prod.id === +localStorage.getItem("productId"))
    return (
        <div className="aside product-info fixed top-4 max-w-[1152px] max-h-[820px] pb-20 p-4 rounded-2xl flex flex-col bg-[#ffffff]">
            <div className="flex justify-end">
                <svg onClick={closeBasket} className="h-8 w-8 mr-4 mt-4 text-gray-600 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path  d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className="product-info-content flex items-center">
                <div className=" flex flex-col w-[60%]">
                    <div className="product-info-text w-full pl-20 flex flex-col">
                        <p className="text-[32px] font-bold">{name} </p>
                        <p className="text-zinc-700 text-[20px]">Выберите нужное количество</p>
                        <div className="w-full mt-20">
                            <div className="flex justify-between">
                                <p className="text-zinc-700">Количество:</p>
                                <p className="text-zinc-700">{+max}</p>
                            </div>
                            <input onChange={(event)=> {
                                onChangeInput()
                                setValue(event.target.value)
                            }} value={value} className="w-full" min="1" max={+max} type="range"/>
                        </div>
                        <div className="flex product-info-info justify-between mb-10 my-4">
                            <div className="flex">
                                <p className="text-[24px] font-[400] mr-2">Цена:</p>
                                <p className="text-[21px] mb-4 font-[500]"><span className="text-[24px]">{price*value}</span> ₽</p>
                            </div>
                            <div className="flex">
                                <p className="text-[24px] font-[400] mr-2">Получите:</p>
                                <p className="text-[21px] mb-4 font-[500]"><span className="text-[24px]">{value*count}</span> шт</p>
                            </div>
                        </div>
                        {product.products[index].disab?
                            <button disabled className=" px-4 py-2 border-0 bg-zinc-500 text-zinc-200 rounded">Уже в корзине</button>
                            :
                            <button onClick={()=> {
                                disableFunc(+localStorage.getItem("productId"),value)
                                closeBasket()
                            }} className=" inner-shadow h-[3.5rem] px-4 py-2 border-0 bg-sky-500 text-[#ffffff] rounded-[12px]">Добавить в корзину</button>
                        }
                    </div>
                </div>
                <div className="product-info-image flex pl-[3rem] flex-col justify-end">
                    <img className="product-info-image w-[256px]" src={serverURL+image} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
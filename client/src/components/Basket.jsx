import React, {useState} from 'react';
import ItemBasket from "./itemBasket";
import { useSelector} from "react-redux";
import axios from "axios";
import {phpURL,$client} from "../http";

const Basket = ({closeBasket}) => {
    const basket = useSelector(state => state.basket)
    const filter = useSelector(state => state.filter)
    const [customer,setCustomer] = useState("")
    const [promo,setPromo] = useState("")
    const [email,setEmail] = useState("")
    const getPayLink = async()=>{
        if(document.querySelector('.okey').checked){
            const index = filter.servers.findIndex(el => el.id === basket.selectServer)
            let products = {}
            basket.basket.map((el)=>{
                products[el.authenticator] = el.value
            })
            try {
                let promise = (await $client.post('api/product/pay',{customer:customer,serverId:+filter.servers[index].authenticator,products:JSON.stringify(products),email:email,promo:promo})).data
				if(promise.response.url){
					location.replace(promise.response.url)
				}else{
                    alert("ошибка!")
                }
               
            }catch (e) {
                console.log(e)
            }
        }else{
            alert("Примите соглашение!")
        }
    }
    return (
        <div className="aside basket fixed top-4 flex w-full max-w-[1152px]  rounded-2xl bg-[#ffffff] py-20 max-h-[820px] p-4">
            <div className="basket-top w-3/5 pl-12 flex flex-col">
                <p className="text-[24px] pb-3">Корзина</p>
                <div className=" overflow-y-scroll h-full overflow-x-hidden product-list pr-3 ">
                    {basket.basket.length > 0 ?
                        basket.basket?.map((el)=>(
                            <ItemBasket key={el.name} id={el.id} value={el.value} count={el.count} name={el.name} image={el.image} price={el.price} />
                        ))
                        :
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <p className="text-[32px]">Ваша корзина пуста</p>
                        </div>
                    }
                </div>
            </div>
            <div className="basket-bottom w-2/5 pl-20 pr-12 basket-form flex flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-[24px]">Оформить заказ: </p>
                </div>
                <div className="py-3">
                    <p className="text-[20px] text-zinc-900 pl-1">Никнейм <span className="text-red-400">*</span> </p>
                    <input onChange={(event)=>setCustomer(event.target.value) } value={customer} placeholder="Никнейм" className=" w-full px-6 py-2 rounded text-zinc-700 text-[20px] border border-zinc-900" type="text"/>
                </div>
                <div className="py-3">
                    <p className="text-[20px] text-zinc-900 pl-1">Почта</p>
                    <input onChange={(event)=>setEmail(event.target.value)} value={email} placeholder="Необязательно" className=" w-full px-6 py-2 rounded text-zinc-700 text-[20px] border border-zinc-900" type="text"/>
                </div>
                <div className="py-3">
                    <p className="text-[20px] text-zinc-900 pl-1">Промокод</p>
                    <input onChange={(event)=>setPromo(event.target.value)} value={promo} placeholder="Если есть" className=" w-full px-6 py-2 rounded text-zinc-700 text-[20px] border border-zinc-900" type="text"/>
                </div>
                <div>
                    <input className="okey" type="checkbox"/>
                    <label htmlFor="" className="ml-4">Я принимаю <a className=" text-sky-500" href="http://localhost:5001/options/agreement.html">условия пользовательского соглашения</a> и <a className="text-sky-500" href="http://localhost:5001/options/provisionOfServices.html">оказания услуг</a></label>
                </div>
                <div className="flex flex-col justify-between mt-4">
                    <p className="text-[18px] mb-4"><span className="text-[24px]">{basket.fullPrice}</span> ₽</p>
                    <button onClick={getPayLink} className="px-4 py-2 border-0 bg-sky-500 text-[#ffffff] rounded">Оформить заказ</button>
                    <button className="basket-cancel px-4 mt-20 py-2 border-0 bg-zinc-300 text-[#ffffff] rounded hover:bg-zinc-500" onClick={closeBasket}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default Basket;
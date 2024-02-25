import React, {useEffect, useState} from 'react';
import footer from '../img/footer.png'
import logo from '../img/logo.png'
import BuyingCard from "./BuyingCard";
import DonateCard from "./DonateCard";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_PRODUCT_IN_BASKET,
    FETCH_FILTERS,
    FETCH_MAIN_DATA, FETCH_PRODUCTS,
    FETCH_SERVER_DATA, FETCH_SERVER_TYPE_NAMES, SET_DISABLE,
    SET_SERVER_FILTER,
    SET_TYPE_FILTER,
    SET_SELECT_SERVER, FETCH_LAST_BUYINGS
} from "../store/actionTypes";
import axios from "axios";
import {$client, phpURL} from "../http";
import Basket from "./Basket";
import {getServersAndTypes} from "../http/productHttp";
import ProductInfo from "./productInfo";
import footerLogo from "../img/footer-logo.svg"
import mainImage from "../img/test.webp"

const App = () => {
    const [loading,setLoading] = useState(true)
    const [basketActive,setBasketActive] = useState(false)
    const [productInfo,setProductInfo] = useState(false)
    const serverData = useSelector(state => state.serverData.online)
    const mainData = useSelector(state => state.mainData.data)
    const filter = useSelector(state => state.filter)
    const product = useSelector(state => state.product)
    const basket = useSelector(state => state.basket)
    const buyings = useSelector(state => state.buyings.buyings)
    const dispatch = useDispatch()
    const copyIp = async() =>{
        const ip = document.querySelector(".ip-only").textContent
        let tempTextArea = document.createElement("textarea");
        tempTextArea.value = ip;

        // Добавление элемента в DOM
        document.body.appendChild(tempTextArea);

        // Выделение текста в textarea
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // Для мобильных устройств

        // Копирование текста в буфер обмена
        document.execCommand("copy");

        // Удаление временного элемента
        document.body.removeChild(tempTextArea);

        // Вывод сообщения об успешном копировании
        alert("Текст успешно скопирован!");
    }
    const redrawFilters = (event,type)=>{
        const pn = event.target.parentNode
        const radio = type === "server" ? ".server-radio" : ".product-radio"
        const radioList = document.querySelectorAll(radio)
        dispatch({type:type === "server" ? SET_SERVER_FILTER : SET_TYPE_FILTER,data:pn.querySelector('input').id})
        radioList.forEach(el=>{
            el.classList.remove('server-first')
            el.querySelector('.filter-item').classList.remove('active')
        })
        pn.querySelector('.filter-item').classList.add('active')
    }
    const writeProductLocalStorage = (id,name,count,price,value=0,image="",max)=>{
        localStorage.clear()
        const index = product.products.findIndex(prod => prod.id === id)
        product.products[index].disb == false? dispatch({type:SET_DISABLE, disab: false,id:id, typeData:type}) : null
        localStorage.setItem("productMax",max)
        localStorage.setItem('productCount',count)
        localStorage.setItem("productId",id)
        localStorage.setItem("productName",name)
        localStorage.setItem("productPrice",price)
        localStorage.setItem("productImage",image)
        setProductInfo(true)
    }
    const disableProduct = (id,value=1)=>{
        const index = product.products.findIndex(prod => prod.id === id)
        if(basket.selectServer === 0){
            dispatch({type:SET_SELECT_SERVER,data:product.products[index].serverId})
            dispatch({type:ADD_PRODUCT_IN_BASKET, data: product.products[index], value:value})
            dispatch({type:SET_DISABLE, disab: true,id:id })
        }else if(product.products[index].serverId === basket.selectServer){
            dispatch({type:ADD_PRODUCT_IN_BASKET, data: product.products[index], value:value})
            dispatch({type:SET_DISABLE, disab: true,id:id })
        }else{
            alert("Это другой сервер!")
        }
    }
    const alertServerError = ()=>{
        alert("У вас уже есть товар с другово сервера! ")
    }
    const getData = async()=>{
        let fetchOnlinePlayers;
        const fetchMainData = (await $client.get('options/main-text.json')).data
        try {
            fetchOnlinePlayers = (await axios.get(`https://api.mcsrvstat.us/2/${fetchMainData.IP}`)).data.players.online
        }catch (e) {
            fetchOnlinePlayers = 0
        }
        dispatch({type:FETCH_MAIN_DATA,
            data: fetchMainData})
        dispatch({type:FETCH_SERVER_DATA,
            data: fetchOnlinePlayers})
        const fetchServerList = (await $client.get('api/server')).data
        const fetchTypeList = (await $client.get('api/type')).data
        const products = (await $client.get('api/product',{typeId:0,serverId:0})).data
        dispatch({type:FETCH_PRODUCTS,
            data:products
        })
		if(fetchServerList.length > 0){
			dispatch({
            type:SET_SERVER_FILTER,data:fetchServerList[0].id
        })
		}
        dispatch({type:FETCH_SERVER_TYPE_NAMES,
            serverList: fetchServerList,
            typeList: fetchTypeList
        })

        await getServersAndTypes().then(data => dispatch({
            type:FETCH_FILTERS,
            servers:data.servers,
            types:data.type,
        }))
        try {
            const promise = await (await $client.post('api/product/buyings',{data:" "})).data
            const buyings = []
            for(let i = 0;i < 18 ;i++){
                if(promise[i]){
                    buyings.push(promise[i])
                }else{
                    break
                }
            }
            dispatch({type:FETCH_LAST_BUYINGS,data:buyings})
        }catch (e) {

        }
        setLoading(false)
    }
    const goToBuy = ()=>{
        const element = document.querySelector('.products')
        element.scrollIntoView({
            block:"start",
            inline:"nearest",
            behavior:"smooth"
        })
    }
    useEffect( ()=>{
        getData()
    },[])
    return (
        <>
            {loading ?
                <div className="flex justify-center  w-full h-[100vh] flex-col items-center text-sky-500 text-[32px]">
                    <div
                        className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                          <span
                              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span>
                    </div>
                </div>
                :
                <>
                    {basketActive || productInfo?
                        null
                        :
                        <div className="w-full z-[9999999] fixed py-4 px-2 opacity-[95%] top-0 ">
                            <div className="nav pb-6 pt-1 flex max-w-[1408px] bg-gray-200 rounded-2xl items-center justify-between">
                                <img className='header-logo h-1xl pl-6' src={logo} alt=""/>
                                <nav className="flex mt-4">
                                    {mainData.Header.nav.map((el)=>(
                                        <a key={el.title} target="_blank" href={el.url} className="px-4 text-gray-700 hover:text-gray-900 hover:cursor-pointer">{el.title}</a>
                                    ))}
                                </nav>
                                <div className='ip-block flex mt-4 pr-6'>
                                    <div
                                        onClick={copyIp}
                                        className="ip inner-shadow bg-sky-500 relative px-6 py-4 rounded text-white font-medium hover:cursor-pointer mr-2">IP: <span className="ip-only">{mainData.IP}</span></div>
                                    <div
                                        className="players-count inner-shadow port bg-sky-500 px-4 py-4 rounded text-white font-medium">{serverData}</div>
                                </div>
                            </div>
                        </div>
                    }
                    {basketActive?
                        <div>
                            <Basket closeBasket={()=>setBasketActive(false)} />
                            <div className="inner-shadow black w-full h-full fixed bg-zinc-900 flex justify-center items-center"></div>
                        </div>
                        :
                        null
                    }
                    {productInfo?
                        <div>
                            <ProductInfo disableFunc={disableProduct} closeBasket={()=>setProductInfo(false)} />
                            <div className="inner-shadow black w-full h-full fixed bg-zinc-900 flex justify-center items-center"></div>
                        </div>

                        :null}
                    <div onClick={()=>setBasketActive(!basketActive)} className="inner-shadow basket-icon absolute right-8 bottom-8 rounded px-5 py-2 bg-sky-500 flex items-center hover:cursor-pointer">
                        <svg className="button-basket h-[48px] w-[48px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M8 5L6 9M16 5L18 9" stroke="#222222" ></path> <path  d="M21 10H19.8022C19.3335 10 18.9277 10.3255 18.826 10.7831L17.348 17.4339C17.1447 18.3489 16.3331 19 15.3957 19H8.60434C7.66695 19 6.85532 18.3489 6.65197 17.4339L5.17402 10.7831C5.07234 10.3255 4.66653 10 4.19783 10H3C2.44772 10 2 9.55228 2 9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10ZM11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12V15C9 15.5523 9.44772 16 10 16C10.5523 16 11 15.5523 11 15V12ZM15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15C13 15.5523 13.4477 16 14 16C14.5523 16 15 15.5523 15 15V12Z" fill="#222222"></path> </g></svg>
                        <div className="text-zinc-700 absolute right-1 top-1 bg-[#ffffff] rounded-full text-center flex flex-col items-center justify-center text-[18px] mr-2">
                            <p className="button-basket-count w-[1.8rem] pt-[0.15rem]">{basket.basket.length}</p>
                        </div>
                    </div>
                    <div className=" content flex flex-col">
                        <header>
                            <div className="background pb-12">
                                <div className="header-content">
                                    <div className="flex items-center w-full main">
                                        <div className="main-top mt-48 w-1/2 mt-[20rem] mb-[20rem]">
                                            <p className="text-gray-800 tracking-[4px]">{mainData.DopText}</p>
                                            <h1
                                                className="w-[95%] text-[40px] tracking-[2px] text-gray-800 font-bold">{mainData.TopText}</h1>
                                            <p className="main-text-center mb-8 mt-1 w-2/5 text-gray-500">{mainData.MainText}</p>
                                            <button
                                                onClick={goToBuy}
                                                className=" inner-shadow px-8 py-4 text-[20px] bg-sky-500 my-8 text-white rounded hover:shadow-[1px_1px_30px_0_#0284c7] hover:transition-all hover:-translate-y-1">Перейти
                                                к оформлению!
                                            </button>
                                        </div>
                                        <img className="main-bottom w-1/2" src={mainImage} alt=""/>
                                    </div>

                                    <p className="text-center mt-[8rem] text-[21px] tracking-[4px]">Последние покупки</p>
                                    <div className="buyingsMenu w-full bg-zinc-700 rounded mt-4 ">
                                        <div className="buyings px-4 py-4 overflow-x-scroll overflow-y-hidden flex flex-nowrap">
                                            {buyings?.map((el)=>(
                                                <BuyingCard key={el.id} customer={el.customer} date={el.created_at} products={el.products} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main className="relative mt-4">
                            <div className="main-background">
                                <div className="main-content">
                                    <div className="filter flex justify-between flex-wrap">
                                        <div className="flex text-[22px] pt-2">
                                            <p className="font-[500] pr-6">Сервер:</p>
                                            <div  className="flex  filter-server">
                                                {basket.selectServer > 0 ?
                                                    filter.servers?.map((el)=>
                                                        el.id === basket.selectServer ?
                                                            <div key={el.id} className=" server-radio text-gray-600  pr-6 ">
                                                                <input  name="server" id={el.id} type="radio"/>
                                                                <label className=" active hover:text-sky-500 filter-item">{el.name}</label>
                                                            </div>
                                                            :
                                                            <div key={el.id} className="server-radio text-gray-400  pr-6 ">
                                                                <input  name="server" id={el.id} type="radio"/>
                                                                <label onClick={alertServerError} className="cursor-pointer ">{el.name}</label>
                                                            </div>)
                                                    :
                                                    filter.servers?.map((el)=>
                                                        (<div key={el.id} className="server-radio server-first text-gray-600  pr-6 ">
                                                            <input  name="server" id={el.id} type="radio"/>
                                                            <label onClick={()=>redrawFilters(event,"server")} className="cursor-pointer hover:text-sky-500 filter-item">{el.name}</label>
                                                        </div>))
                                                }
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap filter-product text-[22px] pt-2">
                                            <p className="pr-6">Категория:</p>
                                            <div className="product-radio text-gray-600 hover:text-sky-500 pr-6 ">
                                                <input name="product" id="0" type="radio"/>
                                                <label onClick={() => redrawFilters(event, "product")}
                                                       className="cursor-pointer hover:text-sky-500 filter-item active">Все</label>
                                            </div>
                                            {filter.types?.map((el)=>
                                                (<div key={el.id} className="product-radio text-gray-600 hover:text-sky-500 pr-6 ">
                                                    <input name="product" id={el.id} type="radio"/>
                                                    <label onClick={() => redrawFilters(event, "product")}
                                                           className="cursor-pointer hover:text-sky-500 filter-item">{el.name}</label>
                                            </div>)
                                            )}
                                        </div>
                                    </div>
                                    <div className="products my-12 mb-[9em] grid grid-cols-5 mx-2 gap-4 market-background">
                                        {filter.types.map((type)=>
                                                product.products?.map((el)=> (
                                                    (
                                                        (filter.activeFilters.server === 0 && filter.activeFilters.type === 0)
                                                        ||
                                                        (filter.activeFilters.server === el.serverId && filter.activeFilters.type === 0)
                                                        ||
                                                        (filter.activeFilters.server === 0 && filter.activeFilters.type === el.typeId)
                                                        ||
                                                        (filter.activeFilters.type === el.typeId && filter.activeFilters.server === el.serverId)) && el.typeId === type.id?
                                                            <DonateCard key={el.name} max={el.max} count={el.count} disableFunc={disableProduct} disable={el.disab} id={el.id} name={el.name} image={el.image} price={el.price} type={1} value={+el.plural} serverId={el.serverId} typeId={el.typeId} writeLocalStorage={writeProductLocalStorage} />
                                                            :
                                                            null
                                                    )
                                                )
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </main>
                        <footer className="relative">
                            <div className="background-footer pb-8">
                                <div className="footer-content flex-wrap flex justify-center">
                                    <div className="flex items-start mx-4 mt-4">
                                        <img className="pt-1" src={footerLogo} alt=""/>
                                        <div className="flex flex-col ml-4">
                                            <p className="text-[20px]  font-600">{mainData.ServerName}</p>
                                            <p className="text-zinc-700 text-[18px]">{mainData.IP}</p>
                                        </div>
                                    </div>
                                    <div className="footer-item flex mx-4 flex-col w-[30%] mt-4">
                                        <p className="text-[18px] font-500">{mainData.Footer.copyright.title}</p>
                                        <p className="text-zinc-700">{mainData.Footer.copyright.des}</p>
                                    </div>
                                    {mainData.Footer.links.map((el)=>(
                                        <div key={el.title} className="footer-item flex mx-4 flex-col mt-4">
                                            <p className="text-[20px] font-500">{el.title}</p>
                                            {el.des.map((el)=>(
                                                <a key={el.title} className="text-zinc-700 hover:text-zinc-900 hover:font-bold transition" target="_blank" href={el.url}>{el.title}</a>
                                            ))}
                                        </div>
                                    ))}
                                    <div className="footer-item flex mx-4 flex-col mt-4">
                                        <p className="text-[20px] font-500">Сайт разработан</p>
                                        <a className="text-zinc-700 hover:text-zinc-900 hover:font-bold transition " target="_blank" href="https://vk.com/ysavely">Якимов Савелий</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </>
            }
        </>
    );
};

export default App;
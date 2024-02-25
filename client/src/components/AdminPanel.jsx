import React, {useEffect, useState} from 'react';
import {$client} from "../http";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_FILTERS, FETCH_PRODUCTS, FETCH_SERVER_TYPE_NAMES} from "../store/actionTypes";
import ProductPanelItem from "./productPanelItem";
import TypeAndServerPanelItem from "./typeAndServerPanelItem";
import {addProduct, addServer, addType} from "../http/productHttp";
import {registration} from "../http/userHttp";
import {useNavigate} from "react-router-dom";
const AdminPanel = () => {
    const [adminType,setAdminType] = useState("servers")
    const [loading,setLoading] = useState(true)
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [type,setType] = useState(",none")
    const [server,setServer] = useState(",none")
    const [max,setMax] = useState(0)
    const [file,setFile] = useState(null)
    const [plural,setPlural] = useState(0)
    const [count,setCount] = useState(0)
    const [userName,setUserName] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [authenticator,setAuthenticator] = useState("")
    const filter = useSelector(state => state.filter)
    const products = useSelector(state => state.product.products)
    const typesAndServers = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const redrawRadio = (type,event)=>{
        const pn = event.target.parentNode
        if(type === "adminType"){
            setAdminType(pn.querySelector('input').value)
            const radioList = document.querySelectorAll('.admin-type')
            radioList.forEach(el=>{
                el.classList.remove('active')
            })
            pn.querySelector('.admin-type').classList.add('active')
        }else{
            setPlural(+pn.querySelector('input').value)
            const radioList = document.querySelectorAll('.plural-type')
            radioList.forEach(el=>{
                el.classList.remove('active')
            })
            pn.querySelector('.plural-type').classList.add('active')
        }
    }
    const push = async()=>{
        if(adminType === "servers"){
            setLoading(true)
            await addServer(name,+authenticator)
            window.location.reload()
        }else if(adminType === "types"){
            setLoading(true)
            await addType(name)
            window.location.reload()
        }else if(adminType === "products"){
            setLoading(true)
            const formData = new FormData()
            formData.append('name',name)
            formData.append('price', +price)
            formData.append('image',file)
            formData.append('plural',+plural)
            formData.append('max',+max)
            formData.append('serverId',+server.split(',')[0])
            formData.append('typeId',+type.split(',')[0])
            formData.append('authenticator',+authenticator)
            formData.append('count',count)
            await addProduct(formData)
            window.location.reload()
        }else if(adminType === "user"){
            await registration(userName,userPassword)
            navigate('/adminLogin')
        }
    }
    const imgChoice = (event) =>{
        setFile(event.target.files[0])
        const [file] = document.querySelector('.img-choice').files
        if (file){
            document.querySelector('.img-preview').src = URL.createObjectURL(file)
        }
    }
    useEffect(()=>{
        (async()=>{
            const types = (await $client.get('api/type')).data
            const servers = (await $client.get('api/server')).data
            const products = (await $client.get('api/product')).data
            dispatch({type:FETCH_FILTERS,servers:servers,types:types})
            dispatch({type:FETCH_PRODUCTS,data:products})
            setLoading(false)
        })()
    },[])
    return (
        <div>
            {loading?
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
                <div>
                    <div className="flex">
                        <div>
                            <input name="adminType" value="servers" type="radio"/>
                            <label onClick={()=>redrawRadio("adminType",event)} className="admin-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer" htmlFor="">Сервера</label>
                        </div>
                        <div>
                            <input name="adminType" value="types" type="radio"/>
                            <label onClick={()=>redrawRadio("adminType",event)} className="admin-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer" htmlFor="">Типы</label>
                        </div>
                        <div>
                            <input name="adminType" value="products" type="radio"/>
                            <label onClick={()=>redrawRadio("adminType",event)} className="admin-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer" htmlFor="">Продукты</label>
                        </div>
                        <div>
                            <input name="adminType" value="user" type="radio"/>
                            <label onClick={()=>redrawRadio("adminType",event)} className="admin-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer" htmlFor="">Администратор</label>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <div className="w-[60%] border border-zinc-900">
                            <div>
                                {adminType === "servers" && <p className="text-center">Сервера</p>}
                                {adminType === "types" && <p className="text-center">Типы</p>}
                                {adminType === "products" && <p className="text-center">Продукты</p>}
                                {adminType === "user" && <p className="text-center">Пользователь</p>}
                                <div className="flex flex-col">
                                    <div className="list w-full border-b border-zinc-900">

                                    </div>
                                    <div className="flex">
                                        <div className="w-1/2 add border-t border-r border-zinc-900 py-4 flex items-center flex-col">
                                            {adminType!=="user" && <div className="w-full flex flex-col items-center">
                                                <p className="mt-2">Название</p>
                                                <input onChange={(event)=>setName(event.target.value)} value={name} className="border border-zinc-900 rounded px-4 py-1 w-[80%]" type="text"/>
                                            </div>}
                                            {adminType === "user" && <div className="w-full flex flex-col items-center">
                                                <div className="w-full flex flex-col items-center">
                                                    <p className="mt-2">Логин</p>
                                                    <input onChange={(event)=>setUserName(event.target.value)} value={userName} className="border border-zinc-900 rounded px-4 py-1 w-[80%]" type="text"/>
                                                </div>
                                                <div className="w-full flex flex-col items-center">
                                                    <p className="mt-2">Пароль</p>
                                                    <input onChange={(event)=>setUserPassword(event.target.value)} value={userPassword} className="border border-zinc-900 rounded px-4 py-1 w-[80%]" type="text"/>
                                                </div>
                                            </div>}
                                            {(adminType=== "servers"||adminType === "products") &&
                                                <div className="w-full flex flex-col items-center">
                                                    <p className="mt-2">Аутентификатор EasyDonate</p>
                                                    <input onChange={(event)=>setAuthenticator(event.target.value)} value={authenticator} className="border border-zinc-900 rounded px-4 py-1 w-[80%]" type="text"/>
                                                </div>
                                            }
                                            {adminType === "products" && (
                                                <div className="flex w-full items-center flex-col">
                                                    <p className="mt-2">Сервер</p>
                                                    <select onChange={(event)=>setServer(event.target.value)} className="border border-zinc-900 rounded px-4 py-1 w-[80%]">
                                                        <option value=",none">none</option>
                                                        {typesAndServers.servers.map((el) => (
                                                            <option key={el.id} value={[el.id,el.name]}>{el.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className="mt-2">Тип</p>
                                                    <select onChange={(event)=>setType(event.target.value)} className="border border-zinc-900 rounded px-4 py-1 w-[80%]">
                                                        <option value=",none">none</option>
                                                        {typesAndServers.types.map((el) => (
                                                            <option key={el.id} value={[el.id,el.name]}>{el.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="w-[90%] flex justify-around">
                                                        <div className="w-1/2">
                                                            <p className="mt-2">Стоимость</p>
                                                            <input onChange={(event)=>setPrice(event.target.value)} value={price} className="border border-zinc-900 rounded px-4 py-1 w-[95%]" type="number"/>
                                                        </div>
                                                        <div className="w-1/2">
                                                            <p className="mt-2">Количество</p>
                                                            <input onChange={(event)=>setCount(event.target.value)} value={count} className="border border-zinc-900 rounded px-4 py-1 w-[95%]" type="number"/>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 w-full text-center">
                                                        <label htmlFor="plural">Численное</label>
                                                        <div className="flex justify-center mt-2">
                                                            <div >
                                                                <input name="plural" value="1" type="radio"/>
                                                                <label onClick={()=>redrawRadio("plural",event)} className="plural-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer">Да</label>
                                                            </div>
                                                            <div>
                                                                <input name="plural" value="0" type="radio"/>
                                                                <label onClick={()=>redrawRadio("plural",event)} className="plural-type px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-900 hover:text-[#ffffff] cursor-pointer">Нет</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2">Максимум можно выбрать</p>
                                                    <input value={max} onChange={(event)=>setMax(event.target.value)} className="border border-zinc-900 rounded px-4 py-1 w-[80%]" type="number"/>
                                                    <p className="mt-2">Изображение</p>
                                                    <input onChange={imgChoice} className="img-choice border border-zinc-900 rounded px-4 py-1 w-[80%]"  accept="image/png" type="file"/>
                                                    <p className="mt-2">Предпросмотр</p>
                                                    <div>
                                                        <div className="bg-zinc-700 p-4 flex flex-col justify-center items-center text-center rounded">
                                                            <div className="top-content flex flex-col items-center justify-center">
                                                                <div className="flex justify-between w-full">
                                                                    <p className="text-gray-400 text-[14px]">{server.split(",")[1]}</p>
                                                                    <p className="text-gray-400 text-[14px]">{type.split(",")[1]}</p>
                                                                </div>
                                                                    <img className="img-preview my-2 w-[192px] h-[192px]" alt=""/>
                                                            </div>
                                                            <div className="text-content ">
                                                                <p className="text-[#ffffff] text-[20px]">{name} x{count}</p>
                                                            </div>
                                                            <div className="flex justify-between w-full mt-2 items-center">
                                                                <p className="text-gray-300 font-[500] text-[20px] mr-2">{price} ₽</p>
                                                                <button className="transition front-[500] text-[18px] h-[32px] bg-zinc-50 text-zinc-900 rounded px-4 py-1 hover:bg-zinc-900 hover:text-zinc-50">В корзину</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button onClick={push} className="rounded px-4 px-1 w-[30%] mt-4 hover:bg-zinc-900 hover:text-[#ffffff]">Добавить</button>
                                        </div>
                                        <div className="w-1/2 rem border-t border-l border-zinc-900 flex items-center flex-col">
                                            <div className="w-[100%]">
                                                <table className="w-[100%]">
                                                    <tbody className="w-[100%]">
                                                    {adminType === "servers" &&
                                                        typesAndServers.servers.map((el)=>(
                                                            <TypeAndServerPanelItem key={el.id} id={el.id} name={el.name} type="server" />
                                                        ))
                                                    }
                                                    {adminType === "types" &&
                                                        typesAndServers.types.map((el)=>(
                                                            <TypeAndServerPanelItem key={el.id} id={el.id} name={el.name} type="type" />
                                                        ))
                                                    }
                                                    {
                                                        adminType === "products"
                                                        &&
                                                        filter.servers.map((server)=>
                                                            filter.types.map((type)=>
                                                                products.map((el)=>
                                                                    (
                                                                        el.typeId === type.id && el.serverId === server.id?
                                                                            <ProductPanelItem key={el.id} id={el.id} name={el.name} serverId={el.serverId} typeId={el.typeId} />
                                                                            :
                                                                            null
                                                                    )
                                                                )

                                                            )
                                                        )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminPanel;
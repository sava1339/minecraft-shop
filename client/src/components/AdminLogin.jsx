import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {check, login} from "../http/userHttp";
import {SET_USER_AUTH} from "../store/actionTypes";
import {useDispatch} from "react-redux";
const AdminLogin = () => {
    const [loginInput,setLoginInput] = useState("")
    const [passwordInput,setPasswordInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginFunc = async() =>{
        await login(loginInput,passwordInput).then(async(data)=> {
            if (data !== undefined){
                await check().then((data)=>{
                    if(data !== undefined){
                        dispatch({type:SET_USER_AUTH,data:true})
                    }})
            }
        })
        navigate('/adminPanel')
    }
    return (
        <div className="flex justify-center ">
            <div className="w-[50%] flex flex-col items-center justify-center bg-zinc-200 px-8 py-4 rounded mt-10">
                <div className="w-[95%]">
                    <p>Логин</p>
                    <input value={loginInput} onChange={(event)=>setLoginInput(event.target.value)} placeholder="Логин" className="border border-zinc-900 rounded px-4 py-1 w-[100%]" type="text"/>
                </div>
                <div className="w-[95%]">
                    <p>Пароль</p>
                    <input value={passwordInput} onChange={(event)=>setPasswordInput(event.target.value)} placeholder="Пароль" className="border border-zinc-900 rounded px-4 py-1 w-[100%]" type="password"/>
                </div>
                <button onClick={loginFunc} className="bg-zinc-400 rounded px-4 px-1 w-[30%] mt-4 hover:bg-zinc-900 hover:text-[#ffffff]">Войти</button>
            </div>
        </div>
    );
};

export default AdminLogin;
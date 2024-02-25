import React, {useEffect, useState} from 'react';
import Router from "./Router";
import {useDispatch} from "react-redux";
import {check} from "../http/userHttp";
import {SET_USER_AUTH} from "../store/actionTypes";
import {$client} from "../http";

const Main = () => {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const start = async()=>{
        const fetchMainData = (await $client.get('api/product/admin')).data
        if(fetchMainData === "true"){
            dispatch({type:SET_USER_AUTH,data:true})
            setLoading(false)
        }else{
            check().then((data)=>{
                if(data !== undefined){
                    dispatch({type:SET_USER_AUTH,data:true})
                }
            }).finally(()=>
                setLoading(false
                ));
        }
    }
    useEffect(()=>{
        start()
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
                <Router/>
            }

        </div>
    );
};

export default Main;
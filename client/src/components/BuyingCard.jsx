import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BuyingCard = ({customer,products,date}) => {
    const nowDate = new Date()
    const buyDate = new Date(date.split(" ")[0].split("-").join("/"))
    const oneHours = 1000 * 60 * 60;
    const diffInTime = nowDate.getTime() - buyDate.getTime();
    const lastDate = Math.round(diffInTime / oneHours)-date.split(" ")[1].split(":")[0];
    const twoProducts = []
    for (let i = 0;i< products.length && i < 2;i++){
        twoProducts.push(products[i])
    }
    return (
        <div className="bg-zinc-600 opacity-90 min-w-[150px] mx-[1em] h-[11.5rem] px-[1.5rem] py-4 rounded flex-nowrap flex flex-col justify-between items-center text-center">
            <img className="w-[4.5rem] h-[4.5rem]" src={`https://mc-heads.net/avatar/${customer}`} alt=""/>
            <p className="text-bold text-[18px] text-white">{customer}</p>
            {twoProducts?.map((el)=>(
                <p key={el.id} className="text-zinc-200 text-[12px]">{el.name} x{el.number}</p>
            ))}
            <p className="text-zinc-400 text-[12px]">{lastDate}ч назад</p>
        </div>
    );
};

export default BuyingCard;
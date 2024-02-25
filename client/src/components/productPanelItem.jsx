import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {delProduct} from '../http/productHttp'

const ProductPanelItem = ({id,name,serverId, typeId}) => {
    const filter = useSelector(state => state.filter)
    const nameServerIndex = filter.servers.findIndex(name => name.id === serverId)
    const nameTypeIndex = filter.types.findIndex(name => name.id === typeId)
    const [loading,setLoading] = useState(false)
    const deleteProduct = async()=>{
        setLoading(true)
        await delProduct(id)
        window.location.reload()
    }
    if(loading){
        return (
            <tr className="border border-zinc-900">
                <td
                    className="inline-block h-[16px] w-[16px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                          <span
                              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span>
                </td>
            </tr>
        )
    }
    return (
        <tr className="border border-zinc-900">
                <td>{name}</td>
                <td>{filter.servers[nameServerIndex].name}</td>
                <td>{filter.types[nameTypeIndex].name}</td>
                <td><button onClick={deleteProduct} className="rounded px-4 px-1 hover:bg-zinc-900 hover:text-[#ffffff]">удалить</button></td>
        </tr>
    );
};

export default ProductPanelItem;
import {$authClient, $client} from "./index";

export const getServersAndTypes = async ()=>{
    const servers = (await $client.get('api/server')).data
    const type = (await $client.get('api/type')).data
    return {servers, type}
}
export const delProduct = async(id)=>{
    try {
        await  $authClient.delete('api/product/'+id)
    }catch (e) {
        return false
    }
}
export const delType = async(id)=>{
    try {
        await $authClient.delete('api/product/for-type/'+id)
        await  $authClient.delete('api/type/'+id)

    }catch (e) {
        return false
    }
}
export const delServer = async(id)=>{
    try {
        await $authClient.delete('api/product/for-server/'+id)
        await  $authClient.delete('api/server/'+id)

    }catch (e) {
        return false
    }
}
export const addProduct = async(data)=> {
    try {
        await $authClient.post('api/product', data)
        return true
    } catch (e) {
        return false
    }
}

export const addType = async(name)=>{
    try {
        await $authClient.post('api/type',{"name":name})
        return true
    }catch (e) {
        return false
    }
}
export const addServer = async(name,authenticator)=>{
    try {
        await $authClient.post('api/server',{"name":name,"authenticator":authenticator})
        return true
    }catch (e) {
        return false
    }
}
import {$authClient, $client} from "./index";
import jwt_decode from 'jwt-decode'
export const registration = async(login,password)=>{
    try {
        const {data} = await $client.post('api/user/reg',{login,password})

        return true
    }catch (e) {
        return false
    }
}
export const login = async (login,password)=>{
    try {
        const {data} = await $client.post('api/user/login',{login,password})
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
    }catch (e) {
        return false
    }
}
export const check = async()=>{
    try {
        const {data} = await $authClient.get('api/user/auth')
        localStorage.setItem('token',data.token)
        return jwt_decode(data.token)
    }catch (e) {

    }
}
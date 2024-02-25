import axios from "axios";
const $client = axios.create({
    baseURL:"http://localhost:5001/"
})
const $authClient = axios.create({
    baseURL:"http://localhost:5001/"
})
const serverURL = "http://localhost:5001/"
const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authClient.interceptors.request.use(authInterceptor)
export {
    $client,
    $authClient,
    serverURL
}
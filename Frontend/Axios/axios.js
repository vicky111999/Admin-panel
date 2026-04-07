import axios from 'axios';


const URL = import.meta.env.VITE_API
const token = localStorage.getItem('token')
const tokenparsed = JSON.parse(token)
export const api = axios.create({
    baseURL:`${URL}`,
    headers:{
        Authorization:`Bearer ${tokenparsed.token}`
    }
})


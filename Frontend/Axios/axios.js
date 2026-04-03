import axios from 'axios';


const URL = import.meta.env.VITE_API
const token = localStorage.getItem('token')
export const api = axios.create({
    baseURL:`${URL}`,
    headers:{
        Authorization:`Bearer ${token}`
    }
})


import axios from 'axios'
import {toast} from 'react-toastify'
import {getApiBaseUrl} from '../config/api'

const instance = axios.create({
    baseURL: getApiBaseUrl()
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(response => {
    if (response.config.method !== 'get') {
        toast.success('Əməliyyat uğurla icra olundu')
    }
    if (response.config.url.includes('export')) {
        return response?.data
    }
    return response?.data?.data
}, error => {
    const data = error.response?.data
    if (error.response?.status === 401) {
        // Only redirect to login if not already on login page
        if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('token')
            localStorage.removeItem('permissions')
            window.location.href = '/login'
        }
    }
    if (data?.data instanceof Object) {
        Object.keys(data?.data).forEach(item => {
            toast.error(data?.data[item][0] || 'Xəta baş verdi')
        })
    } else {
        toast.error(data?.message)
    }
    return Promise.reject(error)
})

export default instance

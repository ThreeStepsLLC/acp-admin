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
    // Handle network errors (no response from server)
    if (!error.response) {
        console.error('❌ Network error or API unreachable:', error.message)
        toast.error('Şəbəkə xətası. Zəhmət olmasa internetə qoşulduğunuzdan əmin olun.')
        return Promise.reject(error)
    }

    const data = error.response?.data
    const status = error.response?.status

    // Handle 401 Unauthorized - only redirect if not on login page
    if (status === 401) {
        const isOnLoginPage = window.location.pathname.includes('/login')
        
        if (!isOnLoginPage) {
            console.warn('⚠️ 401 Unauthorized - redirecting to login')
            localStorage.removeItem('token')
            localStorage.removeItem('permissions')
            window.location.href = '/login'
        } else {
            // On login page, just show error (wrong credentials)
            console.warn('⚠️ 401 on login page - invalid credentials')
        }
    }

    // Handle 403 Forbidden
    if (status === 403) {
        toast.error('Bu əməliyyat üçün icazəniz yoxdur')
    }

    // Handle 404 Not Found - DON'T redirect, just show error
    if (status === 404) {
        toast.error('Məlumat tapılmadı')
    }

    // Handle 500 Server Error - DON'T redirect, just show error
    if (status === 500) {
        toast.error('Server xətası. Zəhmət olmasa bir az sonra yenidən cəhd edin.')
    }

    // Handle validation errors (422 or custom format)
    if (data?.data instanceof Object) {
        Object.keys(data?.data).forEach(item => {
            toast.error(data?.data[item][0] || 'Xəta baş verdi')
        })
    } else if (data?.message) {
        // Only show message if we haven't shown a specific error above
        if (![403, 404, 500].includes(status)) {
            toast.error(data?.message)
        }
    }

    return Promise.reject(error)
})

export default instance

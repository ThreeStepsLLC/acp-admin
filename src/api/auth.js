import axios from './index'

class Auth {
    get = () => axios.get('/admin-auth/users')
    login = data => axios.post('/admin-auth/login', data)
    add = data => axios.post('/admin-auth/add-user', data)
    userUpdate = data => axios.put('/admin-auth/update-password', data)
    addPermission = data => axios.post('/admin-auth/add-permission', data)
    getUserPermission = id => axios.get(`/admin-auth/users/${id}/permissions`)
    permissions = () => axios.get('/admin-permissions')
}

export default new Auth()

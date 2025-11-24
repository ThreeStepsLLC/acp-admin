import axios from './index'

class Services {
    get = () => axios.get(`admin-services`)
    getById = (id) => axios.get(`admin-services/${id}`)
    add = (data) => axios.post(`admin-services`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    update = (data) => axios.put(`admin-services`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    delete = id => axios.delete(`admin-services/${id}`)
}

export default new Services()

import axios from './index'

class ServicesDescription {
    get = () => axios.get(`admin-services-description`)
    getById = (id) => axios.get(`admin-services-description/${id}`)
    add = (data) => axios.post(`admin-services-description`, data)
    update = (data) => axios.put(`admin-services-description`, data)
    delete = id => axios.delete(`admin-services-description/${id}`)
}

export default new ServicesDescription()

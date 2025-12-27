import axios from './index'

class Services {
    get = () => axios.get(`admin-services`)
    getById = (id) => axios.get(`admin-services/${id}`)
    add = (data) => {
        // Don't set Content-Type header manually for FormData
        // Let the browser set it with the boundary
        return axios.post(`admin-services`, data)
    }
    update = (data) => {
        // Don't set Content-Type header manually for FormData
        // Let the browser set it with the boundary
        return axios.put(`admin-services`, data)
    }
    delete = id => axios.delete(`admin-services/${id}`)
}

export default new Services()

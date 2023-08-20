import axios from './index'

class Partners {
    get = () => axios.get(`admin-partners`)
    add = (data) => axios.post(`admin-partners`,data)
    update = (data) => axios.put(`admin-partners`,data)
    delete = id => axios.delete(`admin-partners/${id}`)
}

export default new Partners()

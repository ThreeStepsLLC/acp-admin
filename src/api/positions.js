import axios from './index'

class Positions {
    get = () => axios.get(`admin-positions`)
    add = (data) => axios.post(`admin-positions`,data)
    update = (data) => axios.put(`admin-positions`,data)
    delete = id => axios.delete(`admin-positions/${id}`)
}

export default new Positions()

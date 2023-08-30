import axios from './index'

class Licences {
    get = () => axios.get(`admin-licenses`)
    add = (data) => axios.post(`admin-licenses`, data)
    delete = id => axios.delete(`admin-licenses/${id}`)
}

export default new Licences()
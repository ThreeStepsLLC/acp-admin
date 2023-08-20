import axios from './index'

class Vacancies {
    get = () => axios.get(`admin-vacancies`)
    add = (data) => axios.post(`admin-vacancies`,data)
    update = (data) => axios.put(`admin-vacancies`,data)
    delete = id => axios.delete(`admin-vacancies/${id}`)
}

export default new Vacancies()

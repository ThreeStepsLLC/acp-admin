import axios from './index'

class Sliders {
    get = () => axios.get(`admin-slider-images`)
    add = (data) => axios.post(`admin-slider-images`,data)
    delete = id => axios.delete(`admin-slider-images/${id}`)
}

export default new Sliders()

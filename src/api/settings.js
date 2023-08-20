import axios from './index'

class Settings {
    get = () => axios.get('admin-settings')
    update = data => axios.put('admin-settings', data)
}

export default new Settings()

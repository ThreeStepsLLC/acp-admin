import axios from './index'

class Constants {
    get = id => axios.get(`admin-constants/${id}`)
    update = data => axios.put('admin-constants', data)
    getCertificates = () => axios.get('admin-certificates')
    addCertificates = data => axios.post('admin-certificates', data)
    deleteCertificates = id => axios.delete(`admin-certificates/${id}`)
    getBlogs = () => axios.get('admin-blogs')
    addBlog = data => axios.post('admin-blogs', data)
    updateBlog = data => axios.put('admin-blogs', data)
    deleteBlog = id => axios.delete(`admin-blogs/${id}`)
    getServices = () => axios.get('admin-our-services')
    addService = data => axios.post('admin-our-services', data)
    updateService = data => axios.put('admin-our-services', data)
    deleteService = id => axios.delete(`admin-our-services/${id}`)
    getProjects = () => axios.get('admin-projects')
    getProject = id => axios.get(`admin-projects/${id}`)
    addProject = data => axios.post('admin-projects', data)
    updateProject = data => axios.put('admin-projects', data)
    deleteProject = id => axios.delete(`admin-projects/${id}`)
    deleteProjectImages = id => axios.delete(`admin-project-images/${id}`)
}

export default new Constants()

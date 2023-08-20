import CustomSidebar from '../sidebar'
import {useEffect} from 'react'
import './index.scss'
import {useNavigate} from 'react-router-dom'

const MainLayout = ({item}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if (!token) {
        navigate('/login')
    }
    useEffect(() => {
        document.title = item.title
    }, [item.title])

    return (
        <>
            <CustomSidebar/>
            <div className="container">
                {item.component}
            </div>
        </>
    )
}

export default MainLayout

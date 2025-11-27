import CustomSidebar from '../sidebar'
import {useEffect} from 'react'
import './index.scss'
import {useNavigate} from 'react-router-dom'

const MainLayout = ({item}) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        // Check authentication only once on mount
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login', {replace: true})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array - only run once on mount

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

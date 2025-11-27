import CustomSidebar from '../sidebar'
import {useEffect} from 'react'
import './index.scss'
import {useAuthGuard} from '../../../hooks/useAuth'

const MainLayout = ({item}) => {
    // Protect this route - redirect to login if not authenticated
    useAuthGuard()

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

import {useState} from 'react'
import './index.scss'
import {routeArr, routes} from '../../../routes'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import classNames from 'classnames'
import Logo from '../../../assets/images/logo.png'

const CustomSidebar = () => {
    const [actvie, setActive] = useState(true)
    const navigate = useNavigate()

    const logout = async() => {
        localStorage.clear()
        navigate('/login')
    }

    let permissions
    permissions = localStorage.getItem('permissions') || []
    permissions = permissions?.length ? JSON.parse(permissions) : []
    permissions = permissions?.map(item => item?.id)

    return (
        <div className={classNames({
            sidebar: true,
            active: actvie
        })}>
            <div className="toggle-sidebar" onClick={() => setActive(!actvie)}>
                <i className={classNames({
                    pi: true,
                    'text-white': true,
                    'pi-chevron-left': actvie,
                    'pi-chevron-right': !actvie
                })}/>
            </div>
            <Link to={routes.dashboard.path}
                className="img flex justify-content-center">
                <img width="100%" src={Logo} alt="AFM PRO" className='my-2 p-2'/>
            </Link>
            <nav>
                <ul className="menu">
                    {routeArr.filter(item => item?.show)?.map(item => (
                        (permissions.includes(item?.path.replace('/', '')) || item.path === routes.dashboard.path) && (
                            item.path.includes('/:id') ? null : (
                                <li key={item.path}>
                                    <NavLink to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            )
                        )
                    ))}
                </ul>
                <div className="logout" onClick={logout}>
                    <i className={classNames({
                        pi: true,
                        'pi-sign-out': true
                    })}/>
                    <span>Çıxış et</span>
                </div>
            </nav>
        </div>
    )
}

export default CustomSidebar

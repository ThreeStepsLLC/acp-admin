import {useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

/**
 * Auth Guard Hook
 * Protects routes by checking authentication status
 * Redirects to login if not authenticated
 */
export const useAuthGuard = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        // If no token and not on login page, redirect to login
        if (!token && location.pathname !== '/login') {
            console.warn('🔒 No token found, redirecting to login')
            navigate('/login', {replace: true})
        }
    }, [location.pathname, navigate])
}

/**
 * Login Page Guard Hook
 * Redirects authenticated users away from login page
 */
export const useLoginGuard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        // If token exists, redirect to dashboard
        if (token) {
            console.log('✅ Already authenticated, redirecting to dashboard')
            navigate('/dashboard', {replace: true})
        }
    }, [navigate])
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('token')
}

/**
 * Get current user permissions
 * @returns {Array}
 */
export const getPermissions = () => {
    try {
        const permissions = localStorage.getItem('permissions')
        return permissions ? JSON.parse(permissions) : []
    } catch (error) {
        console.error('Error parsing permissions:', error)
        return []
    }
}

/**
 * Logout user
 * Clears token and permissions, redirects to login
 */
export const logout = (navigate) => {
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    console.log('👋 Logged out')
    navigate('/login', {replace: true})
}

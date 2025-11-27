/**
 * API Configuration
 * Centralized API URL management for both development and production
 */

/**
 * Get the base API URL
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
    // In production, always use the production API
    if (process.env.NODE_ENV === 'production') {
        return 'https://api.onayconsulting.az/api/v1/'
    }
    
    // In development, use env variable or fallback to production
    return process.env.REACT_APP_API_URL || 'https://api.onayconsulting.az/api/v1/'
}

/**
 * Get the base URL for static assets (images, files, etc.)
 * @returns {string} The base URL without /api/v1/
 */
export const getBaseUrl = () => {
    // In production, always use the production URL
    if (process.env.NODE_ENV === 'production') {
        return 'https://api.onayconsulting.az'
    }
    
    // In development, use env variable or fallback to production
    return process.env.REACT_APP_BASE_URL || 'https://api.onayconsulting.az'
}

export default {
    getApiBaseUrl,
    getBaseUrl
}

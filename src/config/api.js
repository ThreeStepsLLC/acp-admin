/**
 * API Configuration
 * Centralized API URL management for both development and production
 * 
 * IMPORTANT: These values are embedded at BUILD TIME by React's webpack.
 * They CANNOT be changed at runtime. Docker must pass --build-arg during build.
 */

// Production fallback (used if build args are missing)
const PRODUCTION_API_URL = 'https://api.onayconsulting.az/api/v1/'
const PRODUCTION_BASE_URL = 'https://api.onayconsulting.az'

/**
 * Get the base API URL
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
    // Use build-time env variable (embedded by webpack during npm build)
    const apiUrl = process.env.REACT_APP_API_URL
    
    // Fallback to production if not set or is localhost
    if (!apiUrl || apiUrl.includes('localhost') || apiUrl === '//localhost:8080/api/v1/') {
        console.warn('⚠️ API URL not set or is localhost, using production:', PRODUCTION_API_URL)
        return PRODUCTION_API_URL
    }
    
    return apiUrl
}

/**
 * Get the base URL for static assets (images, files, etc.)
 * @returns {string} The base URL without /api/v1/
 */
export const getBaseUrl = () => {
    // Use build-time env variable (embedded by webpack during npm build)
    const baseUrl = process.env.REACT_APP_BASE_URL
    
    // Fallback to production if not set or is localhost
    if (!baseUrl || baseUrl.includes('localhost')) {
        console.warn('⚠️ Base URL not set or is localhost, using production:', PRODUCTION_BASE_URL)
        return PRODUCTION_BASE_URL
    }
    
    return baseUrl
}

/**
 * Debug function to check what URLs are being used
 * Call this in browser console: window.checkApiConfig()
 */
export const debugConfig = () => {
    console.log('🔍 API Configuration Debug:')
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('REACT_APP_API_URL (build-time):', process.env.REACT_APP_API_URL)
    console.log('REACT_APP_BASE_URL (build-time):', process.env.REACT_APP_BASE_URL)
    console.log('getApiBaseUrl():', getApiBaseUrl())
    console.log('getBaseUrl():', getBaseUrl())
}

// Expose debug function globally for troubleshooting
if (typeof window !== 'undefined') {
    window.checkApiConfig = debugConfig
}

export default {
    getApiBaseUrl,
    getBaseUrl
}

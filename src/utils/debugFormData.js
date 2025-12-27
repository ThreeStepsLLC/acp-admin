/**
 * Debug utility to inspect FormData contents
 * @param {FormData} formData - The FormData object to debug
 * @param {string} label - Optional label for the debug output
 */
export const debugFormData = (formData, label = 'FormData Debug') => {
    console.group(`🔍 ${label}`)
    
    // Check if it's actually FormData
    if (!(formData instanceof FormData)) {
        console.error('❌ Not a FormData object:', formData)
        console.groupEnd()
        return
    }
    
    // Log all entries
    const entries = []
    for (let [key, value] of formData.entries()) {
        entries.push({ key, value, type: typeof value })
        
        if (value instanceof File) {
            console.log(`📁 ${key}:`, {
                name: value.name,
                size: value.size,
                type: value.type,
                lastModified: new Date(value.lastModified).toISOString()
            })
        } else {
            console.log(`📝 ${key}:`, value)
        }
    }
    
    console.log(`📊 Total entries: ${entries.length}`)
    console.groupEnd()
    
    return entries
}

/**
 * Convert FormData to a plain object for easier inspection
 * Note: Files will be represented as File objects
 * @param {FormData} formData 
 * @returns {Object}
 */
export const formDataToObject = (formData) => {
    const obj = {}
    for (let [key, value] of formData.entries()) {
        obj[key] = value
    }
    return obj
}

/**
 * Create a test FormData with sample data
 * @returns {FormData}
 */
export const createTestFormData = () => {
    const formData = new FormData()
    formData.append('titleAz', 'Test Xidmət')
    formData.append('titleEn', 'Test Service')
    formData.append('titleRu', 'Тест Сервис')
    formData.append('descriptionAz', '<p>Test açıqlama</p>')
    formData.append('descriptionEn', '<p>Test description</p>')
    formData.append('descriptionRu', '<p>Тест описание</p>')
    formData.append('orderNumber', '1')
    formData.append('status', 'true')
    
    // Create a simple test file
    const testSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red"/>
</svg>`
    const blob = new Blob([testSvg], { type: 'image/svg+xml' })
    const file = new File([blob], 'test-icon.svg', { type: 'image/svg+xml' })
    formData.append('file', file)
    
    return formData
}
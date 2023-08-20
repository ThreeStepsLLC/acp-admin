import {addLocale} from 'primereact/api'

const setConfig = () => addLocale('az', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['B', 'BE', 'ÇA', 'Ç', 'CA', 'C', 'Ş'],
    monthNames: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktaybr', 'Noyabr', 'Dekabr'],
    monthNamesShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
    today: 'Hoy',
    clear: 'Limpiar'
})

export default setConfig

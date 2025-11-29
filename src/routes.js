import Dashboard from './views/dashboard'
import Settings from './views/settings'
import Constants from './views/constant'
import Lisences from './views/lisences'
import SeperateLisences from './views/seperateLisences'
import Projects from './views/projects'
import Users from './views/users'
import Positions from "./views/positions";
import Partners from "./views/partners";
import Vacancies from "./views/vacancies";
import Sliders from "./views/sliders";
import Services from "./views/services";

const routeItem = (title, path, component, icon, roles, isSite = false, show = true) => {
    return {
        title,
        path,
        component,
        icon,
        show,
        roles,
        isSite
    }
}

const routes = {
    users: routeItem('İstifadəçilər', '/users', <Users/>, <i className="pi pi-users"/>),
    dashboard: routeItem('ONAY CONSULTING - Admin', '/dashboard', <Dashboard/>, <i className="pi pi-user"/>, null, false, false),
    our_experiences: routeItem('Təcrübələrimiz', '/our-experiences', <Constants id="our-experiences" title="Təcrübələrimiz"/>, <i className="pi pi-user"/>),
    who_are_we: routeItem('Biz kimik', '/who-are-we', <Constants id="who-are-we" title="Biz kimik"/>, <i className="pi pi-user"/>),
    our_values: routeItem('Dəyərlərimiz', '/our-values', <Constants id="our-values" title="Dəyərlərimiz"/>, <i className="pi pi-user"/>),
    our_missions: routeItem('Missiyalarımız', '/our-missions', <Constants id="our-missions" title="Missiyalarımız"/>, <i className="pi pi-user"/>),
    our_vision: routeItem('Viziyonlarımız', '/our-vision', <Constants id="our-vision" title="Viziyonlarımız"/>, <i className="pi pi-user"/>),
    slogan: routeItem('Sloqan', '/slogan', <Constants id="slogan" title="Sloqan"/>, <i className="pi pi-user"/>),
    core_values: routeItem('Əsas dəyərlərimiz', '/core-values', <Constants id="core-values" title="Əsas dəyərlərimiz"/>, <i className="pi pi-user"/>),
    footer_value: routeItem('Footer dəyəri', '/footer-value', <Constants id="footer-value" title="Footer dəyəri"/>, <i className="pi pi-user"/>),
    positions: routeItem('Vəzifələr', '/positions', <Positions/>, <i className="pi pi-user"/>),
    partners: routeItem('Partnyorlar', '/partners', <Partners/>, <i className="pi pi-user"/>),
    vacancies: routeItem('Vakansiyalar', '/vacancies', <Vacancies/>, <i className="pi pi-user"/>),
    services: routeItem('Xidmətlər', '/services', <Services/>, <i className="pi pi-briefcase"/>),
    projects: routeItem('Layihələr', '/projects', <Projects/>, <i className="pi pi-list"/>, null, false, false),
    sliders: routeItem('Karusel', '/slider-images', <Sliders />, <i className="pi pi-list"/>),
    settings: routeItem('Ayarlar', '/settings', <Settings />, <i className="pi pi-cog"/>),
    licenses: routeItem('Lisenziyalar', '/licenses', <Lisences />, <i className="pi pi-cog"/>, null, false, false),
    separate_licenses: routeItem('Ana Səhifə lisenziyalar', '/separate-licenses', <SeperateLisences />, <i className="pi pi-cog"/>),

    
}

const routeArr = Object.values(routes)

export {
    routes,
    routeArr
}
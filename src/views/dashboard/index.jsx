import {Card} from 'primereact/card'
import ThreeSteps from '../../assets/images/threesteps.jpg'
import Logo from '../../assets/images/logo.png'

const Dashboard = () => {
    return (
        <div className="about-page w-full mt-5">
            <div className="content w-full mt-5">
                <div className="grid mt-5">
                    <div className="col-12 md:col-6">
                        <Card>
                            <a href="https://threesteps.az" target="_blank"
                                className="flex justify-content-center align-items-center">
                                <img width="40%" height="0" src={ThreeSteps} alt="ThreeSteps"/>
                            </a>
                        </Card>
                    </div>
                    <div className="col-12 md:col-6">
                        <Card>
                            <a href="http://hidro-insaat.com/" target="_blank"
                                className="flex justify-content-center align-items-center">
                                <img width="100" height="100" src={Logo} alt="32Gozel"/>
                            </a>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

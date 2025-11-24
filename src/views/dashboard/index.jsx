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
                                <img width="40%" height="100" src={ThreeSteps} alt="ThreeSteps"/>
                            </a>
                        </Card>
                    </div>
                    <div className="col-12 md:col-6">
                        <Card style={{height: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <a href="http://afmpro.az/" target="_blank"
                                className="flex justify-content-center align-items-center">
                                <img width="35%" height="auto" src={Logo} alt="AFM PRO"/>
                            </a>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

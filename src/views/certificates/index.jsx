import {ProgressSpinner} from 'primereact/progressspinner'
import {useEffect, useState} from 'react'
import Constants from '../../api/constants'
import {Button} from 'primereact/button'
import Add from './Form'
import {Dialog} from 'primereact/dialog'

const Lisences = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [modalIsActive, setModalIsActive] = useState(false)

    const fetchData = async() => {
        setIsFetching(true)
        const data = await Constants.getCertificates()
        setData(data)
        setIsFetching(false)
    }

    const deleteItem = async id => {
        await Constants.deleteCertificates(id)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <div className="content w-full">
                    <Dialog
                        header="Sertifikat əlavə et"
                        visible={modalIsActive}
                        draggable={false}
                        onHide={() => setModalIsActive(null)}
                        style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                        <Add fetchData={fetchData}/>
                    </Dialog>
                    <p className="page-title">Sertifikatlar</p>
                    <div className="grid w-full">
                        <div className="col-12">
                            <Button onClick={() => setModalIsActive(true)} className="b-button p-button-danger">Əlavə et</Button>
                        </div>
                        {data?.map(item => (
                            <div className="col-12 md:col-2" key={item?.id}>
                                <div className="on-hover-show-trash-icon">
                                    <i className="pi pi-trash" onClick={() => deleteItem(item?.id)}/>
                                    <img width="100%" height="auto" src={item.imageUrl} alt="Image"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Lisences
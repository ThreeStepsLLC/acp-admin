import {useEffect, useState} from 'react'
import Constants from '../../api/vacancies'
import {ProgressSpinner} from 'primereact/progressspinner'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import moment from 'moment'
import {Button} from 'primereact/button'

const Positions = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)

    const fetchData = async () => {
        setIsFetching(true)
        const data = await Constants.get()
        setData(data?.map(item => {
            return {
                ...item,
                imageUrl: <a href={item?.cvFilePath} target="_blank" download={`${item?.fullName}-CV`}>
                    Yüklə
                </a>,
                position:item?.position?.titleAz,
                createDate: moment(item?.createDate).format('DD/MM/YYYY'),
                buttons: <div className="flex gap-1">
                    <Button className="p-button-danger" onClick={() => deleteItem(item?.id)}>
                        <i className="pi pi-trash"/>
                    </Button>
                </div>
            }
        }))
        setIsFetching(false)
    }

    const deleteItem = async id => {
        await Constants.delete(id)
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
                    <p className="page-title">Vakansiyalar</p>
                    <DataTable paginator rows={10} rowsPerPageOptions={[10, 20, 30]} emptyMessage="Məlumat yoxdur"
                               className="mt-5" value={data} responsiveLayout="scroll">
                        <Column field="fullName" header="Ad soyad" sortable/>
                        <Column field="mail" header="Email" sortable/>
                        <Column field="city" header="Şəhər" sortable/>
                        <Column field="position" header="Vəzifə" sortable/>
                        <Column field="cvFilePath" header="CV" sortable/>
                        <Column field="createDate" header="Tarix" sortable/>
                        <Column field="buttons"/>
                    </DataTable>
                </div>)}
        </div>
    )
}

export default Positions

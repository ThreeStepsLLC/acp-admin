import {useEffect, useState} from 'react'
import Constants from '../../api/constants'
import {ProgressSpinner} from 'primereact/progressspinner'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import moment from 'moment'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import Form from './Form'

const Blogs = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [form, setForm] = useState(null)

    const fetchData = async () => {
        setIsFetching(true)
        const data = await Constants.getServices()
        setData(data?.map(item => {
            return {
                ...item,
                imageUrl: <img width="100px" height="100px" src={item?.imageUrl}
                               alt="Image"/>,
                descriptionAZ: item?.descriptionAZ?.substring(0, 20),
                descriptionRU: item?.descriptionRU?.substring(0, 20),
                descriptionEN: item?.descriptionEN?.substring(0, 20),
                titleAZ: item?.titleAZ?.substring(0, 20),
                titleRU: item?.titleRU?.substring(0, 20),
                titleEN: item?.titleEN?.substring(0, 20),
                createDate: moment(item?.createDate).format('DD/MM/YYYY'),
                buttons: <div className="flex gap-1">
                    <Button className="p-button-danger" onClick={() => deleteItem(item?.id)}>
                        <i className="pi pi-trash"/>
                    </Button>
                    <Button className="p-button-success" onClick={() => setForm(item)}>
                        <i className="pi pi-pencil"/>
                    </Button>
                </div>
            }
        }))
        setIsFetching(false)
    }

    const deleteItem = async id => {
        await Constants.deleteService(id)
        fetchData()
    }

    const names = {
        titleAZ: 'Başlıq (az)',
        titleEN: 'Başlıq (en)',
        titleRU: 'Başlıq (ru)',
        descriptionAZ: 'Açıqlama (az)',
        descriptionEN: 'Açıqlama (en)',
        descriptionRU: 'Açıqlama (ru)',
        createDate: 'Tarix',
        imageUrl: 'Şəkil'
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
                    <p className="page-title">Xidmətlər</p>
                    <div className="col-12">
                        <Button onClick={() => setForm(true)} className="b-button p-button-danger">Əlavə et</Button>
                    </div>
                    <Dialog
                        header={`${form?.id ? 'Xidmətə düzəliş et' : 'Xidmət əlavə et'}`}
                        visible={form}
                        draggable={false}
                        onHide={() => setForm(null)}
                        style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                        <Form fetchData={fetchData} form={form} setForm={setForm}/>
                    </Dialog>
                    <DataTable paginator rows={10} rowsPerPageOptions={[10, 20, 30]} emptyMessage="Məlumat yoxdur"
                               className="mt-5" value={data} responsiveLayout="scroll">
                        <Column field="titleAZ" header={names.titleAZ} sortable/>
                        <Column field="titleEN" header={names.titleEN} sortable/>
                        <Column field="titleRU" header={names.titleRU} sortable/>
                        <Column field="descriptionAZ" header={names.descriptionAZ} sortable
                                body={(rowData) => (
                                    <div dangerouslySetInnerHTML={{__html: rowData.descriptionAZ}}/>
                                )}
                        />
                        <Column field="descriptionEN" header={names.descriptionEN} sortable
                                body={(rowData) => (
                                    <div dangerouslySetInnerHTML={{__html: rowData.descriptionEN}}/>
                                )}
                        />
                        <Column field="descriptionRU" header={names.descriptionRU} sortable
                                body={(rowData) => (
                                    <div dangerouslySetInnerHTML={{__html: rowData.descriptionRU}}/>
                                )}
                        />
                        <Column field="createDate" header={names.createDate} sortable/>
                        <Column field="imageUrl" header={names.imageUrl} sortable/>
                        <Column field="buttons"/>
                    </DataTable>
                </div>)}
        </div>
    )
}

export default Blogs

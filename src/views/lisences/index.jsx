import {useEffect, useState} from 'react'
import Constants from '../../api/licenses'
import {ProgressSpinner} from 'primereact/progressspinner'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import moment from 'moment'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import Form from './Form'

const Lisences = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [form, setForm] = useState(null)

    const fetchData = async () => {
        setIsFetching(true)
        const data = await Constants.get()
        setData(data?.map(item => {
            return {
                ...item,
                imageUrl: <img width="100px" height="100px" src={item?.imageUrl}
                               alt="Image"/>,
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

    const names = {
        title: 'Başlıq',
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
                    <p className="page-title">Lisenziyalar</p>
                    <div className="col-12">
                        <Button onClick={() => setForm(true)} className="b-button p-button-danger">Əlavə et</Button>
                    </div>
                    <Dialog
                        header={`${form?.id ? 'Xidmətə düzəliş et' : 'Karusel şəkli əlavə et'}`}
                        visible={form}
                        draggable={false}
                        onHide={() => setForm(null)}
                        style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                        <Form fetchData={fetchData} form={form} setForm={setForm}/>
                    </Dialog>
                    <DataTable paginator rows={10} rowsPerPageOptions={[10, 20, 30]} emptyMessage="Məlumat yoxdur"
                               className="mt-5" value={data} responsiveLayout="scroll">
                        <Column field="createDate" header={names.createDate} sortable/>
                        <Column field="imageUrl" header={names.imageUrl} sortable/>
                        <Column field="buttons"/>
                    </DataTable>
                </div>)}
        </div>
    )
}

export default Lisences

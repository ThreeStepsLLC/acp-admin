import {useEffect, useState} from 'react'
import ServicesAPI from '../../api/services'
import {ProgressSpinner} from 'primereact/progressspinner'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {InputSwitch} from 'primereact/inputswitch'
import {confirmDialog} from 'primereact/confirmdialog'
import {toast} from 'react-toastify'
import Form from './Form'

const Services = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [form, setForm] = useState(null)

    const fetchData = async () => {
        setIsFetching(true)
        try {
            const response = await ServicesAPI.get()
            console.log('Services response:', response)
            setData(response?.map(item => {
                return {
                    ...item,
                    iconPreview: item?.iconUrl ? (
                        <img width="50px" height="50px" src={item?.iconUrl} alt="Icon"/>
                    ) : null,
                    titleAz: item?.titleAz?.substring(0, 30),
                    titleEn: item?.titleEn?.substring(0, 30),
                    titleRu: item?.titleRu?.substring(0, 30),
                    statusToggle: (
                        <InputSwitch 
                            checked={item?.status} 
                            onChange={(e) => handleStatusChange(item?.id, e.value)}
                        />
                    ),
                    buttons: <div className="flex gap-1">
                        <Button className="p-button-success" onClick={() => editItem(item)}>
                            <i className="pi pi-pencil"/>
                        </Button>
                        <Button className="p-button-danger" onClick={() => confirmDelete(item?.id)}>
                            <i className="pi pi-trash"/>
                        </Button>
                    </div>
                }
            }))
        } catch (error) {
            toast.error('Məlumatlar yüklənərkən xəta baş verdi')
        }
        setIsFetching(false)
    }

    const editItem = async (item) => {
        try {
            const response = await ServicesAPI.getById(item.id)
            setForm(response)
        } catch (error) {
            toast.error('Məlumat yüklənərkən xəta baş verdi')
        }
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('status', newStatus)
            await ServicesAPI.update(formData)
            toast.success('Status uğurla yeniləndi')
            fetchData()
        } catch (error) {
            toast.error('Status yenilənərkən xəta baş verdi')
        }
    }

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Bu xidməti silmək istədiyinizdən əminsiniz?',
            header: 'Təsdiq',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteItem(id),
            acceptLabel: 'Bəli',
            rejectLabel: 'Xeyr',
            acceptClassName: 'p-button-danger'
        })
    }

    const deleteItem = async id => {
        try {
            await ServicesAPI.delete(id)
            toast.success('Xidmət uğurla silindi')
            fetchData()
        } catch (error) {
            toast.error('Xidmət silinərkən xəta baş verdi')
        }
    }

    const names = {
        titleAz: 'Başlıq (AZ)',
        titleEn: 'Başlıq (EN)',
        titleRu: 'Başlıq (RU)',
        orderNumber: 'Sıra',
        iconPreview: 'İkon',
        statusToggle: 'Status'
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
                        style={{width: '70vw'}} breakpoints={{'960px': '85vw', '641px': '100vw'}}>
                        <Form fetchData={fetchData} form={form} setForm={setForm}/>
                    </Dialog>
                    <DataTable 
                        paginator 
                        rows={10} 
                        rowsPerPageOptions={[10, 20, 30]} 
                        emptyMessage="Məlumat yoxdur"
                        className="mt-5" 
                        value={data} 
                        sortField="orderNumber"
                        sortOrder={1}>
                        <Column field="iconPreview" header={names.iconPreview}/>
                        <Column field="titleAz" header={names.titleAz} sortable/>
                        <Column field="titleEn" header={names.titleEn} sortable/>
                        <Column field="titleRu" header={names.titleRu} sortable/>
                        <Column field="orderNumber" header={names.orderNumber} sortable/>
                        <Column field="statusToggle" header={names.statusToggle}/>
                        <Column field="buttons"/>
                    </DataTable>
                </div>)}
        </div>
    )
}

export default Services

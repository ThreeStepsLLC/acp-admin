import {useEffect, useState} from 'react'
import ServicesAPI from '../../api/services'
import ServicesDescriptionAPI from '../../api/servicesDescription'
import {ProgressSpinner} from 'primereact/progressspinner'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {InputSwitch} from 'primereact/inputswitch'
import {confirmDialog} from 'primereact/confirmdialog'
import {toast} from 'react-toastify'
import {Divider} from 'primereact/divider'
import Form from './Form'
import DescriptionForm from './DescriptionForm'

const Services = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [form, setForm] = useState(null)
    const [descriptionData, setDescriptionData] = useState(null)
    const [descriptionForm, setDescriptionForm] = useState(null)
    const [isFetchingDescription, setIsFetchingDescription] = useState(true)

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

    const fetchDescriptionData = async () => {
        setIsFetchingDescription(true)
        try {
            const response = await ServicesDescriptionAPI.get()
            console.log('Services Description response:', response)
            
            // Response data object içində gəlir
            const dataItem = response?.data || response
            
            if (dataItem && dataItem.id) {
                // Tək bir object gəlir, onu array-ə çeviririk
                setDescriptionData([{
                    ...dataItem,
                    descriptionAzPreview: dataItem?.descriptionAz ? 
                        <div dangerouslySetInnerHTML={{__html: dataItem.descriptionAz.substring(0, 100) + '...'}} /> : '-',
                    descriptionEnPreview: dataItem?.descriptionEn ? 
                        <div dangerouslySetInnerHTML={{__html: dataItem.descriptionEn.substring(0, 100) + '...'}} /> : '-',
                    descriptionRuPreview: dataItem?.descriptionRu ? 
                        <div dangerouslySetInnerHTML={{__html: dataItem.descriptionRu.substring(0, 100) + '...'}} /> : '-',
                    buttons: <div className="flex gap-1">
                        <Button className="p-button-success" onClick={() => editDescription(dataItem)}>
                            <i className="pi pi-pencil"/>
                        </Button>
                        <Button className="p-button-danger" onClick={() => confirmDeleteDescription(dataItem?.id)}>
                            <i className="pi pi-trash"/>
                        </Button>
                    </div>
                }])
            } else {
                setDescriptionData([])
            }
        } catch (error) {
            console.error('Description fetch error:', error)
            toast.error('Təsvir məlumatları yüklənərkən xəta baş verdi')
            setDescriptionData([])
        }
        setIsFetchingDescription(false)
    }

    const editDescription = async (item) => {
        try {
            const response = await ServicesDescriptionAPI.getById(item.id)
            // Response data object içində gələ bilər
            const dataItem = response?.data || response
            setDescriptionForm(dataItem)
        } catch (error) {
            console.error('Edit description error:', error)
            toast.error('Təsvir məlumatı yüklənərkən xəta baş verdi')
        }
    }

    const confirmDeleteDescription = (id) => {
        confirmDialog({
            message: 'Bu təsviri silmək istədiyinizdən əminsiniz?',
            header: 'Təsdiq',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteDescription(id),
            acceptLabel: 'Bəli',
            rejectLabel: 'Xeyr',
            acceptClassName: 'p-button-danger'
        })
    }

    const deleteDescription = async id => {
        try {
            await ServicesDescriptionAPI.delete(id)
            toast.success('Təsvir uğurla silindi')
            fetchDescriptionData()
        } catch (error) {
            toast.error('Təsvir silinərkən xəta baş verdi')
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
        fetchDescriptionData()
    }, [])

    const descriptionNames = {
        id: 'ID',
        descriptionAzPreview: 'Təsvir (AZ)',
        descriptionEnPreview: 'Təsvir (EN)',
        descriptionRuPreview: 'Təsvir (RU)'
    }

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <div className="content w-full">
                    <p className="page-title">Xidmətlər</p>
                    
                    {/* Services Cards Section */}
                    <div className="col-12">
                        <h3>Xidmət Kartları</h3>
                        <Button onClick={() => setForm(true)} className="b-button p-button-danger">Xidmət əlavə et</Button>
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

                    <Divider />

                    {/* Services Description Section */}
                    <div className="col-12 mt-5">
                        <h3>Xidmətlər Təsviri</h3>
                        <p className="text-sm text-gray-600 mb-3">Ümumi xidmətlər bölməsi üçün təsvir</p>
                        {isFetchingDescription ? (
                            <div className="flex mt-3 justify-content-center align-items-center">
                                <ProgressSpinner style={{width: '50px', height: '50px'}}/>
                            </div>
                        ) : (
                            <>
                                <Button 
                                    onClick={() => setDescriptionForm(true)} 
                                    className="b-button p-button-success mb-3">
                                    {descriptionData && descriptionData.length > 0 ? 'Təsvir əlavə et' : 'Yeni təsvir yarat'}
                                </Button>
                                <Dialog
                                    header={`${descriptionForm?.id ? 'Təsvirə düzəliş et' : 'Təsvir əlavə et'}`}
                                    visible={descriptionForm}
                                    draggable={false}
                                    onHide={() => setDescriptionForm(null)}
                                    style={{width: '70vw'}} breakpoints={{'960px': '85vw', '641px': '100vw'}}>
                                    <DescriptionForm fetchData={fetchDescriptionData} form={descriptionForm} setForm={setDescriptionForm}/>
                                </Dialog>
                                
                                {descriptionData && descriptionData.length > 0 ? (
                                    <DataTable 
                                        paginator 
                                        rows={10} 
                                        rowsPerPageOptions={[10, 20, 30]} 
                                        emptyMessage="Məlumat yoxdur"
                                        value={descriptionData}>
                                        <Column field="id" header={descriptionNames.id} sortable/>
                                        <Column field="descriptionAzPreview" header={descriptionNames.descriptionAzPreview}/>
                                        <Column field="descriptionEnPreview" header={descriptionNames.descriptionEnPreview}/>
                                        <Column field="descriptionRuPreview" header={descriptionNames.descriptionRuPreview}/>
                                        <Column field="buttons"/>
                                    </DataTable>
                                ) : (
                                    <div className="mt-3 p-3 border-1 border-dashed border-300 border-round text-center">
                                        <p className="text-gray-600">Təsvir yoxdur. Yeni təsvir yaratmaq üçün "Yeni təsvir yarat" düyməsinə klikləyin.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>)}
        </div>
    )
}

export default Services

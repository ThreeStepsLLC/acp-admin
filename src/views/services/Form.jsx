import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import ServicesAPI from '../../api/services'
import {InputText} from 'primereact/inputtext'
import {InputNumber} from 'primereact/inputnumber'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {TabView, TabPanel} from 'primereact/tabview'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import {debugFormData} from '../../utils/debugFormData'
import lampIcon from '../../assets/svg/lamp-icon.svg'
import layerIcon from '../../assets/svg/layer-icon.svg'
import settingsIcon from '../../assets/svg/settings-icon.svg'
import shareIcon from '../../assets/svg/share-icon.svg'
import e1Icon from '../../assets/svg/e1.svg'
import e2Icon from '../../assets/svg/e2.svg'
import e3Icon from '../../assets/svg/e3.svg'
import e4Icon from '../../assets/svg/e4.svg'
import e5Icon from '../../assets/svg/e5.svg'

const availableIcons = [
    { name: 'Lamp Icon', value: 'lamp-icon.svg', icon: lampIcon },
    { name: 'Layer Icon', value: 'layer-icon.svg', icon: layerIcon },
    { name: 'Settings Icon', value: 'settings-icon.svg', icon: settingsIcon },
    { name: 'Share Icon', value: 'share-icon.svg', icon: shareIcon },
    { name: 'E1 Icon', value: 'e1.svg', icon: e1Icon },
    { name: 'E2 Icon', value: 'e2.svg', icon: e2Icon },
    { name: 'E3 Icon', value: 'e3.svg', icon: e3Icon },
    { name: 'E4 Icon', value: 'e4.svg', icon: e4Icon },
    { name: 'E5 Icon', value: 'e5.svg', icon: e5Icon }
]

const Form = ({form, setForm, fetchData}) => {
    const {control, setValue, handleSubmit, reset} = useForm()
    const [loader, setLoader] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [activeTab, setActiveTab] = useState(0)

    const submit = async data => {
        // Validation
        if (!data.titleAz || !data.titleEn || !data.titleRu) {
            toast.error('Bütün dil başlıqları tələb olunur')
            return
        }
        if (!data.descriptionAz || !data.descriptionEn || !data.descriptionRu) {
            toast.error('Bütün dil açıqlamaları tələb olunur')
            return
        }
        if (!data.orderNumber && data.orderNumber !== 0) {
            toast.error('Sıra nömrəsi tələb olunur')
            return
        }
        if (!selectedIcon) {
            toast.error('İkon seçilməlidir')
            return
        }

        setLoader(true)
        
        try {
            const formData = new FormData()
            
            if (form?.id) {
                formData.append('id', form.id)
            }
            
            formData.append('titleAz', data.titleAz || '')
            formData.append('titleEn', data.titleEn || '')
            formData.append('titleRu', data.titleRu || '')
            formData.append('descriptionAz', data.descriptionAz || '')
            formData.append('descriptionEn', data.descriptionEn || '')
            formData.append('descriptionRu', data.descriptionRu || '')
            formData.append('orderNumber', String(data.orderNumber || 0))
            formData.append('status', data.status !== undefined ? String(data.status) : 'true')
            
            // Handle file upload for icon
            if (selectedIcon) {
                const iconData = availableIcons.find(i => i.value === selectedIcon)
                if (iconData) {
                    try {
                        // Fetch the SVG file and convert to blob
                        const response = await fetch(iconData.icon)
                        if (!response.ok) {
                            throw new Error(`Failed to fetch icon: ${response.status}`)
                        }
                        const blob = await response.blob()
                        const file = new File([blob], selectedIcon, { type: 'image/svg+xml' })
                        formData.append('file', file)
                    } catch (fetchError) {
                        console.error('Error fetching icon:', fetchError)
                        toast.error('İkon yüklənərkən xəta baş verdi')
                        setLoader(false)
                        return
                    }
                }
            }

            // Debug: Log FormData contents
            debugFormData(formData, 'Services Form Submission')

            await ServicesAPI[form?.id ? 'update' : 'add'](formData)
            toast.success(form?.id ? 'Xidmət uğurla yeniləndi' : 'Xidmət uğurla əlavə edildi')
            fetchData()
            setForm(null)
        } catch (e) {
            console.error('Submit error:', e)
            const errorMessage = e?.response?.data?.message || e?.message || 'Naməlum xəta baş verdi'
            toast.error('Xəta baş verdi: ' + errorMessage)
        }
        setLoader(false)
    }

    useEffect(() => {
        if (form?.id) {
            reset(form)
            // Extract icon name from iconUrl if exists
            if (form?.iconUrl) {
                const iconName = form.iconUrl.split('/').pop()
                const matchedIcon = availableIcons.find(i => i.value === iconName)
                if (matchedIcon) {
                    setSelectedIcon(matchedIcon.value)
                }
            }
        } else {
            reset({
                titleAz: '',
                titleEn: '',
                titleRu: '',
                descriptionAz: '',
                descriptionEn: '',
                descriptionRu: '',
                orderNumber: 0,
                status: true
            })
            setSelectedIcon(null)
        }
    }, [form, reset])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid w-full">
            <div className="col-12">
                <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                    <TabPanel header="Azərbaycan">
                        <div className="grid">
                            <Controller 
                                control={control} 
                                name="titleAz"
                                rules={{required: 'Başlıq tələb olunur'}}
                                render={({field: {value, onChange}}) => (
                                    <div className="col-12">
                                        <label htmlFor="titleAz">Başlıq (AZ) *</label>
                                        <InputText 
                                            className="w-full" 
                                            id="titleAz" 
                                            value={value || ''}
                                            onChange={onChange}
                                        />
                                    </div>
                                )}
                            />
                            <Controller 
                                control={control} 
                                name="descriptionAz"
                                rules={{required: 'Açıqlama tələb olunur'}}
                                render={({field: {value}}) => (
                                    <div className="col-12">
                                        <label htmlFor="descriptionAz">Açıqlama (AZ) *</label>
                                        <CKEditor 
                                            editor={ClassicEditor} 
                                            data={value || ''} 
                                            onChange={(_, editor) => {
                                                setValue('descriptionAz', editor.getData())
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                    
                    <TabPanel header="English">
                        <div className="grid">
                            <Controller 
                                control={control} 
                                name="titleEn"
                                rules={{required: 'Title is required'}}
                                render={({field: {value, onChange}}) => (
                                    <div className="col-12">
                                        <label htmlFor="titleEn">Title (EN) *</label>
                                        <InputText 
                                            className="w-full" 
                                            id="titleEn" 
                                            value={value || ''}
                                            onChange={onChange}
                                        />
                                    </div>
                                )}
                            />
                            <Controller 
                                control={control} 
                                name="descriptionEn"
                                rules={{required: 'Description is required'}}
                                render={({field: {value}}) => (
                                    <div className="col-12">
                                        <label htmlFor="descriptionEn">Description (EN) *</label>
                                        <CKEditor 
                                            editor={ClassicEditor} 
                                            data={value || ''} 
                                            onChange={(_, editor) => {
                                                setValue('descriptionEn', editor.getData())
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                    
                    <TabPanel header="Русский">
                        <div className="grid">
                            <Controller 
                                control={control} 
                                name="titleRu"
                                rules={{required: 'Заголовок обязателен'}}
                                render={({field: {value, onChange}}) => (
                                    <div className="col-12">
                                        <label htmlFor="titleRu">Заголовок (RU) *</label>
                                        <InputText 
                                            className="w-full" 
                                            id="titleRu" 
                                            value={value || ''}
                                            onChange={onChange}
                                        />
                                    </div>
                                )}
                            />
                            <Controller 
                                control={control} 
                                name="descriptionRu"
                                rules={{required: 'Описание обязательно'}}
                                render={({field: {value}}) => (
                                    <div className="col-12">
                                        <label htmlFor="descriptionRu">Описание (RU) *</label>
                                        <CKEditor 
                                            editor={ClassicEditor} 
                                            data={value || ''} 
                                            onChange={(_, editor) => {
                                                setValue('descriptionRu', editor.getData())
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                </TabView>
            </div>

            <Controller 
                control={control} 
                name="orderNumber"
                rules={{required: 'Sıra nömrəsi tələb olunur'}}
                render={({field: {value, onChange}}) => (
                    <div className="col-12 md:col-6">
                        <label htmlFor="orderNumber">Sıra nömrəsi *</label>
                        <InputNumber 
                            className="w-full" 
                            id="orderNumber" 
                            value={value}
                            onValueChange={(e) => onChange(e.value)}
                            min={0}
                        />
                    </div>
                )}
            />

            <div className="col-12 md:col-6">
                <label htmlFor="iconSelect">İkon seç *</label>
                <Dropdown 
                    id="iconSelect"
                    value={selectedIcon}
                    options={availableIcons}
                    onChange={(e) => setSelectedIcon(e.value)}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="İkon seçin"
                    className="w-full"
                    itemTemplate={(option) => (
                        <div className="flex align-items-center gap-2">
                            <img src={option.icon} alt={option.name} width="30" height="30" />
                            <span>{option.name}</span>
                        </div>
                    )}
                    valueTemplate={(option) => {
                        if (option) {
                            const selected = availableIcons.find(i => i.value === option)
                            return (
                                <div className="flex align-items-center gap-2">
                                    <img src={selected?.icon} alt={selected?.name} width="30" height="30" />
                                    <span>{selected?.name}</span>
                                </div>
                            )
                        }
                        return <span>İkon seçin</span>
                    }}
                />
            </div>

            {selectedIcon && (
                <div className="col-12">
                    <div className="flex align-items-center gap-2">
                        <span>Seçilmiş ikon:</span>
                        <img 
                            width="80" 
                            height="80"
                            src={availableIcons.find(i => i.value === selectedIcon)?.icon}
                            alt="Selected Icon"
                            style={{objectFit: 'contain', border: '1px solid #ddd', padding: '10px', borderRadius: '8px'}}
                        />
                    </div>
                </div>
            )}

            <div className="col-12">
                <div className="flex justify-content-end gap-2">
                    <Button 
                        type="button"
                        className="p-button-secondary" 
                        onClick={() => setForm(null)}
                        disabled={loader}>
                        Ləğv et
                    </Button>
                    <Button 
                        type="submit"
                        className="p-button-danger" 
                        disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-2"/>}
                        Yadda saxla
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form

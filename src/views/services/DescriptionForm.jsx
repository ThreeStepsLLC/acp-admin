import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import ServicesDescriptionAPI from '../../api/servicesDescription'
import {Button} from 'primereact/button'
import {TabView, TabPanel} from 'primereact/tabview'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"

const DescriptionForm = ({form, setForm, fetchData}) => {
    const {control, setValue, handleSubmit, reset, formState: {errors}} = useForm()
    const [loader, setLoader] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const submit = async data => {
        if (!data.descriptionAz || !data.descriptionEn || !data.descriptionRu) {
            toast.error('Bütün dil təsvirləri tələb olunur')
            return
        }

        const payload = {
            descriptionAz: data.descriptionAz,
            descriptionEn: data.descriptionEn,
            descriptionRu: data.descriptionRu
        }
        
        if (form?.id) {
            payload.id = form.id
        }

        setLoader(true)
        try {
            await ServicesDescriptionAPI[form?.id ? 'update' : 'add'](payload)
            toast.success(form?.id ? 'Təsvir uğurla yeniləndi' : 'Təsvir uğurla əlavə edildi')
            fetchData()
            setForm(null)
        } catch (e) {
            toast.error('Xəta baş verdi: ' + (e?.response?.data?.message || e.message))
        }
        setLoader(false)
    }

    useEffect(() => {
        if (form?.id) {
            reset(form)
        } else {
            reset({
                descriptionAz: '',
                descriptionEn: '',
                descriptionRu: ''
            })
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
                                name="descriptionAz"
                                rules={{required: 'Təsvir tələb olunur'}}
                                render={({field: {value}}) => (
                                    <div className="col-12">
                                        <label htmlFor="descriptionAz">Təsvir (AZ) *</label>
                                        <CKEditor 
                                            editor={ClassicEditor} 
                                            data={value || ''} 
                                            onChange={(event, editor) => {
                                                setValue('descriptionAz', editor.getData())
                                            }}
                                        />
                                        {errors.descriptionAz && (
                                            <small className="p-error">{errors.descriptionAz.message}</small>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                    
                    <TabPanel header="English">
                        <div className="grid">
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
                                            onChange={(event, editor) => {
                                                setValue('descriptionEn', editor.getData())
                                            }}
                                        />
                                        {errors.descriptionEn && (
                                            <small className="p-error">{errors.descriptionEn.message}</small>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                    
                    <TabPanel header="Русский">
                        <div className="grid">
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
                                            onChange={(event, editor) => {
                                                setValue('descriptionRu', editor.getData())
                                            }}
                                        />
                                        {errors.descriptionRu && (
                                            <small className="p-error">{errors.descriptionRu.message}</small>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </TabPanel>
                </TabView>
            </div>

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
                        className="p-button-success" 
                        disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-2"/>}
                        {form?.id ? 'Yenilə' : 'Yadda saxla'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default DescriptionForm

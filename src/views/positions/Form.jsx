import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import Constants from '../../api/positions'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'

const Form = ({form, setForm, fetchData}) => {
    const {control, handleSubmit, reset} = useForm()
    const [loader, setLoader] = useState(false)

    const submit = async data => {
        setLoader(true)
        try {
            await Constants[form?.id ? 'update' : 'add'](data)
            fetchData()
            setForm(null)
        } catch (e) {
            toast.error('Xəta baş verdi')
        }
        setLoader(true)
    }

    useEffect(() => {
        if (form?.id) {
            reset(form)
        }
    }, [form])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid w-full">
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleAZ">Başlıq (az)</label>
                    <InputText className="w-full" name="titleAZ" id="titleAZ" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleAZ"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleEN">Başlıq (en)</label>
                    <InputText className="w-full" name="titleEN" id="titleEN" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleEN"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleRU">Başlıq (ru)</label>
                    <InputText className="w-full" name="titleRU" id="titleRU" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleRU"/>
            <div className="col-12">
                <div className="flex justify-content-end">
                    <Button className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
            Yadda saxla
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form

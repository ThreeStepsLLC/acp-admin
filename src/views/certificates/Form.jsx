import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import Constants from '../../api/silders'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";

const Form = ({form, setForm, fetchData}) => {
    const {control,setValue, handleSubmit, reset} = useForm()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null)

    const submit = async data => {
        const formData = new FormData()
        delete data.file

        Object.keys(data).forEach(item => {
            formData.append(item, data[item])
        })

        formData.append('file', file)

        setLoader(true)
        try {
            await Constants[form?.id ? 'update' : 'add'](formData)
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
            <div className="col-12">
                <label
                    className="p-button p-button-secondary"
                    htmlFor="file">{file ? 'Şəkli dəyiş' : 'Şəkil seç'}</label>
                <input className="v-hidden" type="file" accept=".png,.jpg,.jpeg,.jiff" name="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}/>
            </div>
            {(file || form?.imageUrl) && (
                <div className="col-12">
                    <img width="150" height="150"
                        src={file ? URL.createObjectURL(file) : `${form?.imageUrl}`}
                        alt="Image"/>
                </div>
            )}
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
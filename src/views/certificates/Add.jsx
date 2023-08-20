import {useState} from 'react'
import Constants from '../../api/constants'
import {toast} from 'react-toastify'
import {Button} from 'primereact/button'

const Add = ({fetchData}) => {
    const [file, setFile] = useState(null)
    const [loader, setLoader] = useState(false)

    const add = async() => {
        const formData = new FormData()
        if (file) {
            setLoader(true)
            formData.append('file', file)
            formData.append('title', '')
            await Constants.addCertificates(formData)
            fetchData()
            setLoader(false)
            return
        }
        toast.error('Şəkil seçilməyib')
    }

    return (
        <div className="grid w-full">
            <div className="col-12 col:md-6">
                <label
                    className="p-button p-button-secondary"
                    htmlFor="file">{file ? 'Şəkli dəyiş' : 'Şəkil seç'}</label>
                <input className="v-hidden" type="file" accept=".png,.jpg,.jpeg,.jiff" name="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}/>
            </div>
            {file && (
                <div className="col-12 col:md-6">
                    <img width="150" height="150"
                        src={URL.createObjectURL(file)}
                        alt="Image"/>
                </div>
            )}
            <div className="col-12">
                <div className="flex justify-content-end">
                    <Button onClick={add} className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
            Yadda saxla
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Add

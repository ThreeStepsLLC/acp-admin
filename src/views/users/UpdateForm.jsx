import {Controller, useForm} from 'react-hook-form'
import {useState} from 'react'
import Auth from '../../api/auth'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import classNames from 'classnames'

const UpdateForm = ({form, setForm, fetchData}) => {
    const [loader, setLoader] = useState(false)
    const {control, handleSubmit, formState: {errors}} = useForm()
    const [passwordIsShow, setPasswordIsShow] = useState(false)

    const create = async data => {
        setLoader(true)
        try {
            await Auth.userUpdate({
                ...data,
                userId: form?.id
            })
            fetchData()
            setForm(null)
        } catch (e) {
            console.log('Error')
        } finally {
            setLoader(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(create)} className="grid w-full">
            <Controller rules={{
                required: true
            }} control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label htmlFor="password">Şifrə</label>
                    <span className="p-input-icon-right w-full">
                        <i onClick={() => setPasswordIsShow(!passwordIsShow)} className={classNames({
                            'pi cursor-pointer': true,
                            'pi-eye': !passwordIsShow,
                            'pi-eye-slash': passwordIsShow
                        })}/>
                        <InputText
                            className="w-full"
                            value={value}
                            onChange={onChange}
                            id="password"
                            aria-describedby="password"
                            placeholder="Şifrə"
                            type={passwordIsShow ? 'text' : 'password'}
                        />
                    </span>
                    {errors.password && (
                        <small className="form-element-is-invalid">
              Xana məcburidir
                        </small>
                    )}
                </div>
            )} name="password"/>
            <div className="col-12">
                <div className="flex justify-content-end gap-2">
                    <Button className="p-button-danger p-button-sm" disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
            Yadda saxla
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default UpdateForm

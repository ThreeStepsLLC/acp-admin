import '../index.scss'
import {Controller, useForm} from 'react-hook-form'
import {InputText} from 'primereact/inputtext'
import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import Logo from '../../../assets/images/favicon.png'
import {useState} from 'react'
import Auth from '../../../api/auth'
import {useNavigate} from 'react-router-dom'
import {routes} from '../../../routes'
import classNames from 'classnames'
import {toast} from "react-toastify";

const Login = () => {
    const {control, handleSubmit, formState: {errors}} = useForm()
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const [passwordIsShow, setPasswordIsShow] = useState(false)

    const login = async data => {
        setLoader(true)
        try {
            const res = await Auth.login(data)
            localStorage.setItem('permissions', JSON.stringify(res?.permissions))
            localStorage.setItem('token', res?.token)
            navigate(routes.dashboard.path)
        } catch (e) {
            toast.error('İstifadəçi adı və ya şifrə yanlışdır!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="grid">
                <div className="col-12 md:col-4 md:col-offset-4">
                    <Card className="mt-5">
                        <div className="text-center">
                            <img width="100px" height="100px" src={Logo} alt="Image"/>
                        </div>
                        <div className="title">Giriş</div>
                        <form onSubmit={handleSubmit(login)} className="grid">
                            <div className="col-12">
                                <Controller rules={{
                                    required: true
                                }} control={control} name="username" render={({field: {value, onChange}}) => (
                                    <InputText
                                        className="w-full"
                                        value={value}
                                        onChange={onChange}
                                        id="username"
                                        aria-describedby="username"
                                        placeholder="İstifadəçi adı"
                                    />
                                )}/>
                                {errors.username && (
                                    <small className="form-element-is-invalid">
                    Xana məcburidir
                                    </small>
                                )}
                            </div>
                            <div className="col-12">
                                <Controller rules={{
                                    required: true
                                }} control={control} name="password" render={({field: {value, onChange}}) => (
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
                                )}/>
                                {errors.password && (
                                    <small className="form-element-is-invalid">
                    Xana məcburidir
                                    </small>
                                )}
                            </div>
                            <div className="col-12">
                                <Button onClick={handleSubmit(login)} className="p-button-danger w-full text-center inline-block"
                                    disabled={loader}>
                                    {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
                  Giriş et
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login

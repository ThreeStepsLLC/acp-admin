import {ProgressSpinner} from 'primereact/progressspinner'
import {useEffect, useState} from 'react'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Controller, useForm} from 'react-hook-form'
import SettingsApi from '../../api/settings'
import {Dropdown} from 'primereact/dropdown'

const Settings = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [loader, setLoader] = useState(false)
    const [info, setInfo] = useState(null)

    const {control, reset, handleSubmit} = useForm()

    const fetchData = async() => {
        setIsFetching(true)
        const data = await SettingsApi.get()
        delete data.status
        setInfo(data)
        reset(data)
        setIsFetching(false)
    }

    const update = async(data) => {
        setLoader(true)
        await SettingsApi.update(data)
        setLoader(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const names = {
        mailAdressForContact: 'E-mail',
        defaultLanguage: 'Saytın dili',
        phone: 'Telefon'
    }

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <div className="content w-full">
                    <p className="page-title">Ayarlar</p>
                    <form onSubmit={handleSubmit(update)}>
                        <div className="grid w-full">
                            {info && Object.keys(info).map(item => (
                                item !== 'id' && (
                                    item === 'defaultLanguage' ? (
                                        <Controller control={control} render={({field: {value, onChange}}) => (
                                            <div className="col-12 col:md-6">
                                                <label htmlFor={item}>{names[item] || item.charAt(0).toUpperCase() + item.slice(1)}</label>
                                                <Dropdown
                                                    value={value}
                                                    onChange={onChange}
                                                    options={[
                                                        {
                                                            value: 'az',
                                                            label: 'Azərbaycan'
                                                        },
                                                        {
                                                            value: 'en',
                                                            label: 'İngilis'
                                                        },
                                                        {
                                                            value: 'ru',
                                                            label: 'Rus'
                                                        }
                                                    ]}
                                                    name={item}
                                                    className="w-full"/>
                                            </div>
                                        )} name={item}/>
                                    ) : (
                                        <Controller control={control} render={({field: {value, onChange}}) => (
                                            <div className="col-12 col:md-6">
                                                <label htmlFor={item}>{names[item] || item.charAt(0).toUpperCase() + item.slice(1)}</label>
                                                <InputText className="w-full" name={item} id={item} value={value} onChange={onChange}/>
                                            </div>
                                        )} name={item}/>
                                    )
                                )
                            ))}
                        </div>
                        <div className="grid">
                            <div className="col-12">
                                <div className="flex justify-content-end">
                                    <Button className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
                    Yadda saxla
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Settings

import { Fragment, useEffect, useState } from 'react';
import Constants from '../../api/constants';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Constant = ({ id, title }) => {
    const [isFetching, setIsFetching] = useState(true);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);


    const { control, setValue, reset, handleSubmit } = useForm();

    const fetchData = async () => {
        setIsFetching(true);
        const data = await Constants.get(id);
        setData(data);
        reset(data);
        setIsFetching(false);
    };

    const update = async (data) => {
        try {
            data.id = id;
            delete data.file;

            setLoader(true);
            await Constants.update(data);
            setLoader(false);

        } catch (e) {
            setLoader(false);
        }
    };



    useEffect(() => {
        fetchData();
    }, [id]);

    const names = {
        titleEN: 'Başlıq (en)',
        titleAZ: 'Başlıq (az)',
        titleRU: 'Başlıq (ru)',
        descriptionEN: 'Açıqlama (en)',
        descriptionAZ: 'Açıqlama (az)',
        descriptionRU: 'Açıqlama (ru)',
        descriptionEN2: 'Açıqlama 2 (en)',
        descriptionAZ2: 'Açıqlama 2 (az)',
        descriptionRU2: 'Açıqlama 2 (ru)',
        mediaContentUrl1 : 'Şəkil 1',
        mediaContentUrl2 : 'Şəkil 2',
        youTubeLink1 : 'Video 1',
        youTubeLink2 : 'Video 2'
    };

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <div className="content w-full">
                    <p className="page-title">{title}</p>
                    <form onSubmit={handleSubmit(update)}>
                        <div className="grid w-full">
                            {data &&
                                Object.keys(data).map((item, index) => (
                                    item !== 'id' && <Fragment key={item}>
                                            <Fragment>
                                                {item.includes('description') ? (
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { value, onChange } }) => (
                                                            <div className="col-12 col:md-6">
                                                                <label htmlFor={item}>
                                                                    {names[item] || item.charAt(0).toUpperCase() + item.slice(1)}
                                                                </label>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={value}
                                                                    onChange={(event, editor) => {
                                                                        setValue(item, editor.getData());
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        name={item}
                                                    />
                                                ) : (
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { value, onChange } }) => (
                                                            <div className="col-12 col:md-6">
                                                                <label htmlFor={item}>
                                                                    {names[item] || item.charAt(0).toUpperCase() + item.slice(1)}
                                                                </label>
                                                                <InputText
                                                                    className="w-full"
                                                                    name={item}
                                                                    id={item}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                />
                                                            </div>
                                                        )}
                                                        name={item}
                                                    />
                                                )}
                                            </Fragment>
                                    </Fragment>
                                ))}
                        </div>
                        <div className="grid">
                            <div className="col-12">
                                <div className="flex justify-content-end">
                                    <Button className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                                        {loader && <i className="pi pi-spin pi-spinner mr-1" />}
                                        Yadda saxla
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Constant;

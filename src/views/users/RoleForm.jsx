import { useEffect, useState } from 'react';
import Auth from '../../api/auth'; // Update the path to your Auth module
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { ProgressSpinner } from 'primereact/progressspinner';

const RoleForm = ({ form, setForm, fetchData }) => {
    const [permissions, setPermissions] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [userPermissions, setUserPermissions] = useState([]);

    const fetchPermissions = async () => {
        try {
            const res = await Auth.permissions();
            setPermissions(res);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    const getUserPermissions = async (id) => {
        try {
            const response = await Auth.getUserPermission(id);
            const userPermissionIds = response.map(item => item.id); // Extract IDs from the response array
            setUserPermissions(userPermissionIds);
        } catch (error) {
            console.error("Error fetching user permissions:", error);
        }
    };




    const fetchAllData = async () => {
        setIsFetching(true);
        await Promise.all([fetchPermissions(), getUserPermissions(form?.id)]);
        setIsFetching(false);
    };

    const submit = async () => {
        setLoader(true);
        try {
            await Auth.addPermission({
                userId: form?.id,
                permissions: userPermissions,
            });
            fetchData();
            setForm(null);
        } catch (e) {
            console.error("Error adding permissions:", e);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <form onSubmit={submit}>
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <>
                    {permissions.map(item => (
                        <div className="col-12" key={item?.id}>
                            <div className="flex align-items-center">
                                <Checkbox
                                    inputId={item?.id}
                                    name={item?.id}
                                    value={item?.id}
                                    onChange={() => {
                                        setUserPermissions(prev => {
                                            if (prev.includes(item?.id)) {
                                                return prev.filter(item2 => item2 !== item?.id);
                                            } else {
                                                return [...prev, item?.id];
                                            }
                                        });
                                    }}
                                    checked={userPermissions?.includes(item?.id)}  // Check if the item's ID is in userPermissions
                                />
                                <label htmlFor={item?.id} className="ml-2">
                                    {item?.title}
                                </label>
                            </div>
                        </div>
                    ))}

                    <div className="col-12">
                        <div className="flex justify-content-end gap-2">
                            <Button onClick={submit} className="p-button-danger p-button-sm" disabled={loader}>
                                {loader && <i className="pi pi-spin pi-spinner mr-1" />}
                                Yadda saxla
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </form>
    );
};

export default RoleForm;

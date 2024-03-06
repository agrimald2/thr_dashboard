import React, {useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import DeleteModal from "../../components/delete_modal/delete_modal";
import {Button} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function ProductsList() {
    const [showDelete, setShowDelete] = useState(0);
    const navigate = useNavigate();

    const cols = [
        {title: 'Name', internal: 'name'},
        {title: 'Code', internal: 'code'},
        {title: 'Price USD', internal: 'price'},
        {title: 'Category', internal: 'subcategory.category.name'},
        {title: 'Subcategory', internal: 'subcategory.name'},
        {title: 'Store', internal: 'store.name'},
        {title: 'Actions', internal: 'id', code: (row, data) => {
                return (
                    <div className={'d-flex justify-content-end'}>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => navigate('/products/form', {state: row})}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => setShowDelete(row.id)}>
                            <FontAwesomeIcon icon={faTrash} color={'#F00'}/>
                        </div>
                    </div>
                )

            }}
    ]
    return (
        <div>
            <Header/>
            <Sidebar/>

            {showDelete > 0 && <DeleteModal
                title={'Delete Product'}
                close={setShowDelete}>
                <div className={'d-flex justify-content-end align-items-center'}>
                    <Button
                        name={'Delete'}
                        variant={'danger'}
                        onClick={() => {
                            axiosInstance.delete('product/' + showDelete + '/').then((response) => {
                                setShowDelete(0);
                                toast('Product deleted', ToastTypes.SUCCESS);
                                window.location.reload();
                            });
                        }}/>
                </div>
            </DeleteModal>}

            <div className={'mainContainer'}>
                <Table model={'product'} withIndex={true} cols={cols} create={'/products/form'}/>
            </div>
        </div>
    )
}
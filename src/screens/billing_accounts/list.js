import React from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faRefresh, faTrash} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../AxiosInstance";
import {useNavigate} from "react-router-dom";

export default function BillingAccounts() {
    const navigate = useNavigate();
    const swap = (row) => {
        row.active = row.active !== true;
        console.log(row);
        axiosInstance.put(`billing_account/${row.id}/`, row).then((response) => {
            window.location.reload();
        });
    }

    const cols = [
        {title: 'Name', internal: 'name'},
        {title: 'Payment Method', internal: 'payment_method', code: (row, data) => {
                return (data === 0 ? 'OpenPay' :
                    (data === 1 ? 'Apple Pay' :
                        (data === 2 ? 'Mercadopago' :
                            (data === 3 ? 'Crypto' : 'Unknown'))));

            }},
        {title: 'Active', internal: 'active', code: (row, data) => {
                return (data === true ? 'Yes' : 'No');
            }},
        {title: 'Created at', internal: 'created_at', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
        {title: 'Updated at', internal: 'updated_at', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
        {title: 'Actions', internal: 'id', code: (row, data) => {
                return (
                    <div className={'d-flex justify-content-end'}>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => navigate('/billing_accounts/form', {state: row})}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => swap(row)}>
                            <FontAwesomeIcon icon={faRefresh} color={'#F00'}/>
                        </div>
                    </div>
                )

            }}
    ]

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <Table model={'billing_account'} withIndex={true} cols={cols} create={'/billing_accounts/form'}/>
            </div>
        </div>
    )
}
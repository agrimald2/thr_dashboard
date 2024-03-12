import React, {useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPaperclip, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/modal";
import {Select} from "../../ajonjolib/inputs/ajonjolinput";
import {useNavigate} from "react-router-dom";
import {toast} from "../../ajonjolib/toasts/toast/toast";

export default function PaymentLinksList() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(null);
    const [filters, setFilters] = useState({});
    const cols = [
        {title: 'Reference', internal: 'reference'},
        {title: 'Amount', internal: 'amount'},
        {title: 'Currency', internal: 'currency.name'},
        {title: 'Account', internal: 'billing_account.name'},
        {title: 'Payed', internal: 'payed', code: (row, data) => {
                return (data === true ? 'Yes' : 'No');

            } },
        {title: 'Date', internal: 'created_at', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
        {title: 'Actions', internal: 'id', code: (row, data) => {
                return (
                    <div className={'d-flex justify-content-center'}>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => navigate('/payment_links/form', {state: row})}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => {
                            navigator.clipboard.writeText(`https://payments.camionerosperuanos.org/payment/${row.reference}`);
                            toast('Link copied to clipboard');
                        }}>
                            <FontAwesomeIcon icon={faPaperclip}/>
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
                <Table model={'payment_link'} cols={cols} filters={filters} create={'/payment_links/form'}/>
            </div>
        </div>
    );
}
import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {Select} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPaperclip, faPenToSquare, faRefresh} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/modal";
import PaymentModal from "../../components/payment_modal/payment_modal";
import {toast} from "../../ajonjolib/toasts/toast/toast";

export default function PaymentList() {
    const [filters, setFilters] = useState({});
    const [currencys, setCurrencys] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [billingAccounts, setBillingAccounts] = useState([]);
    const cols = [
        {title: 'Reference', internal: 'reference'},
        {title: 'Amount', internal: 'amount'},
        {title: 'Currency', internal: 'currency', code: (row, data) => {
            return data.name;
        }},
        {title: 'Billing Account', internal: 'billing_account', code: (row, data) => {
            return data.name;
            }},
        {title: 'Method', internal: 'payment_method', code: (row, data) => {
            return (data === 0 ? 'OpenPay' :
                (data === 1 ? 'Apple Pay' :
                    (data === 2 ? 'Mercadopago' :
                        (data === 3 ? 'Crypto' : 'Unknown'))));
            }},
        {title: 'Status', internal: 'status', code: (row, data) => {
            return (data === 0 ? 'Pending' :
                    (data === 1 ? 'Confirmed' : 'Unknown'));
            }},
        {title: 'Date', internal: 'created_at', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
        {title: 'Actions', internal: 'id', code: (row, data) => {
                return (
                    <div className={'d-flex justify-content-end'}>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => setShowModal(row)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className={'pe-2'} style={{cursor: 'pointer'}} onClick={() => {
                            navigator.clipboard.writeText(`https://payments.camionerosperuanos.org/payment/${row.sale_reference}`);
                            toast('Link copied to clipboard');
                        }}>
                            <FontAwesomeIcon icon={faPaperclip}/>
                        </div>
                    </div>
                )

            }}
    ]

    useEffect(() => {
        axiosInstance.get('/currency').then((res) => {
            setCurrencys(res.data.results);
        });

        axiosInstance.get('/billing_account').then((res) => {
            setBillingAccounts(res.data.results);
        });
    }, []);

    return (
        <div>
            <Header/>
            <Sidebar/>

            {showModal && (
                <PaymentModal close={() => setShowModal(null)} payment={showModal}/>
            )}

            <div className={'mainContainer'}>
                <Table model={'payment'} withIndex={true} cols={cols} filters={filters}>
                    <div className={'ms-5 d-flex justify-content-start align-items-center'}>
                        <Select style={{minWidth: '200px'}} value={filters?.payment_method} onChange={(val) => {
                            setFilters({...filters, payment_method: val});
                        }}
                        options={[
                            {value: 0, name: 'OpenPay'},
                            {value: 1, name: 'Apple Pay'},
                            {value: 2, name: 'Mercadopago'},
                            {value: 3, name: 'Crypto'},
                        ]}/>
                        <div className={'mx-2'}/>
                        <Select style={{minWidth: '200px'}} value={filters?.status} onChange={(val) => {
                            setFilters({...filters, status: val});
                        }}
                                options={[
                                    {value: 0, name: 'Pending'},
                                    {value: 1, name: 'Confirmed'},
                                ]}
                        />
                        <div className={'mx-2'}/>
                        <Select style={{minWidth: '200px'}} value={filters?.currency} onChange={(val) => {
                                    setFilters({...filters, currency: val});
                                }}
                                options={currencys.map((currency) => {
                                    return {value: currency.id, name: currency.name};
                                })}
                        />
                        <div className={'mx-2'}/>
                        <Select style={{minWidth: '200px'}} value={filters?.billing_account} onChange={(val) => {
                            setFilters({...filters, billing_account: val});
                        }}
                                options={billingAccounts.map((acc) => {
                                    return {value: acc.id, name: acc.name};
                                })}
                        />
                        <div className={'mx-2'}/>
                        <input type={'date'} value={filters.created_at} onChange={(event) => {
                            setFilters({...filters, created_at: event.target.value});
                        }}/>
                    </div>
                </Table>
            </div>
        </div>
    );
}
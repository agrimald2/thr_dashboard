import React, {useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {Select} from "../../ajonjolib/inputs/ajonjolinput";

export default function PaymentList() {
    const [filters, setFilters] = useState({});
    const cols = [
        {title: 'Reference', internal: 'reference'},
        {title: 'Amount', internal: 'amount'},
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
    ]
    return (
        <div>
            <Header/>
            <Sidebar/>

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
                        <input type={'date'} value={filters.created_at} onChange={(event) => {
                            setFilters({...filters, created_at: event.target.value});
                        }}/>
                    </div>
                </Table>
            </div>
        </div>
    );
}
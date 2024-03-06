import React from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";

export default function PaymentList() {
    const cols = [
        {title: 'Name', internal: 'name'},
        {title: 'Description', internal: 'description'},
        {title: 'Last Update', internal: 'updated_at', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
    ]
    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <Table model={'payment'} withIndex={true} cols={cols}/>
            </div>
        </div>
    );
}
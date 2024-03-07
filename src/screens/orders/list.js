import React, {useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/modal";
import {Select} from "../../ajonjolib/inputs/ajonjolinput";

export default function OrderList() {
    const [showModal, setShowModal] = useState(null);
    const [filters, setFilters] = useState({});
    const cols = [
        {title: 'Reference', internal: 'reference'},
        {title: 'Total', internal: 'sub_total'},
        {title: 'Phone', internal: 'phone_number'},
        {title: 'Status', internal: 'status', code: (row, data) => {
                return (data === 0 ? 'Pending' :
                    (data === 1 ? 'Confirmed' :
                        (data === 2 ? 'In Delivery' :
                            (data === 3 ? 'Delivered' :
                                (data === 4 ? 'Canceled' : 'Unknown')))));
            }
        },
        {title: 'Date', internal: 'date', code: (row, data) => {
                return new Date(data).toLocaleString();
            }},
        {title: 'Actions', internal: 'id', code: (row, data) => {
                return (
                    <div className={'d-flex justify-content-center'}>
                        <div style={{cursor: 'pointer'}} onClick={() => setShowModal(row)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    </div>
                )
            }}
    ]
    return (
        <div>
            <Header/>
            <Sidebar/>

            {showModal &&
                <Modal close={() => setShowModal(null)} sale={showModal}/>
            }

            <div className={'mainContainer'}>
                <Table model={'sale'} cols={cols} filters={filters}>
                    <div className={'ms-5 d-flex align-items-center justify-content-start'}>
                        <Select
                            style={{minWidth: '200px'}}
                            options={[
                                {value: 0, name: 'Pending'},
                                {value: 1, name: 'Confirmed'},
                                {value: 2, name: 'In Delivery'},
                                {value: 3, name: 'Delivered'},
                                {value: 4, name: 'Canceled'}
                            ]}
                            value={filters.status}
                            onChange={(val) => setFilters({...filters, status: val})}
                        />
                    </div>
                </Table>
            </div>
        </div>
    );
}
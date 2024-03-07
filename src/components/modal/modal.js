import React from "react";
import styles from './modal.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faClipboard, faPerson, faPersonBiking} from "@fortawesome/free-solid-svg-icons";

function formatTimestamp(timestamp) {
    if(timestamp == null) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB');
}

function getOrderStatus(status) {
    if(status === 0) return <div style={{
        backgroundColor: '#fa9f43',
        textAlign: "center",
        borderRadius: '6px',
        color: '#FFF'
    }}>Pending Payment</div>;
    else if(status === 1) return <div style={{
        backgroundColor: '#fae243',
        textAlign: "center",
        borderRadius: '6px',
        color: '#FFF'
    }}>Confirmed</div>;
    else if(status === 2) return <div style={{
        backgroundColor: '#439ffa',
        textAlign: "center",
        borderRadius: '6px',
        color: '#FFF'
    }}>In Delivery</div>;
    else if(status === 4) return <div style={{
        backgroundColor: '#31e523',
        textAlign: "center",
        borderRadius: '6px',
        color: '#FFF'
    }}>Delivered</div>;
    else if(status === 5) return <div style={{
        backgroundColor: '#f34933',
        textAlign: "center",
        borderRadius: '6px',
        color: '#FFF'
    }}>Canceled</div>;
    return "Unknown";
}

export default function Modal({sale, title, subtitle, close}) {

    const formatPrice = (price) => {
        const number_to_string = price?.toString();
        const integer = parseInt(number_to_string);
        const reversedNumberString = String(integer).split('').reverse().join('');

        const formattedNumber = reversedNumberString.replace(/(\d{3})/g, '$1 ').trim();

        return formattedNumber.split('').reverse().join('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.backdrop} onClick={close}/>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div style={{color: '#000000', fontSize: '18px', fontFamily: '500', lineHeight: '22px'}}>{title}</div>
                        <div style={{color: '#8FA4D6', fontSize: '15px', fontFamily: '400', lineHeight: '13px'}}>{subtitle}</div>
                    </div>
                </div>
                <div style={{
                    color: '#8B8B8B',
                    fontWeight: '400',
                    fontSize: '14px',
                    padding: '24px 32px',
                }}>
                    <div className={`${styles.createContainer} p-4`}>
                        <div className={'d-flex'}>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faBuilding} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div className={'mb-2'}><b>{sale.supplier ? sale.supplier?.name : sale.warehouse?.name}</b></div>
                                </div>
                            </div>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faPerson} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div>
                                        <div className={'mb-2'}><b>Client</b></div>
                                        <div>Name: {sale?.first_name + ' ' + sale?.last_name}</div>
                                        <div>Phone: {sale?.phone_number}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.createContainer} p-4`}>
                        <div className={'d-flex'}>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faClipboard} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div className={'mb-2'}><b>Reference: {sale.reference}</b></div>
                                    <div className={'mb-2'}><b>Date: {formatTimestamp(sale.date)}</b></div>
                                    <div className={'mb-2'}><b>Status: {getOrderStatus(sale.status)}</b></div>
                                </div>
                            </div>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faPersonBiking} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div className={'mb-2'}><b>Address: {sale?.address}</b></div>
                                    <div className={'mb-2'}><b>Indications: {sale?.indications}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className={'d-flex justify-content-center mt-3'}>
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sale.items?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatPrice(item.price)}</td>
                                            <td>{formatPrice(item.sub_total)}</td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan={3} className={'text-end'}><b>Delivery Fee</b></td>
                                    <td>{formatPrice(0)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className={'text-end'}><b>Total</b></td>
                                    <td>{formatPrice(sale.sub_total)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
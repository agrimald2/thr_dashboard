import React from "react";
import styles from "../modal/modal.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faClipboard,
    faCoins,
    faMoneyBills,
    faPerson,
    faPersonBiking
} from "@fortawesome/free-solid-svg-icons";

function formatTimestamp(timestamp) {
    if(timestamp == null) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB');
}

function formatPrice(price) {
    const number_to_string = price?.toString();
    const integer = parseInt(number_to_string);
    const reversedNumberString = String(integer).split('').reverse().join('');

    const formattedNumber = reversedNumberString.replace(/(\d{3})/g, '$1 ').trim();

    return formattedNumber.split('').reverse().join('');
}

function parsePaymentMethod(method) {
    return (method === 0 ? 'OpenPay' :
        (method === 1 ? 'Apple Pay' :
            (method === 2 ? 'Mercadopago' :
                (method === 3 ? 'Crypto' : 'Unknown'))));
}

export default function PaymentModal({payment, close}) {
    return (
        <div className={styles.container}>
            <div className={styles.backdrop} onClick={close}/>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div style={{color: '#000000', fontSize: '18px', fontFamily: '500', lineHeight: '22px'}}>Reference: {payment.reference}</div>
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
                                <FontAwesomeIcon icon={faCoins} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div className={'mb-2'}><b>Amount: {payment.currency?.symbol} {formatPrice(payment.amount)}</b></div>
                                    <div className={'mb-2'}><b>Currency: {payment.currency?.name}</b></div>
                                </div>
                            </div>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faMoneyBills} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div>
                                        <div className={'mb-2'}><b>Billing Account</b></div>
                                        <div>Account: {payment?.billing_account?.name}</div>
                                        <div>Method: {parsePaymentMethod(payment?.billing_account?.payment_method)}</div>
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
                                    <div className={'mb-2'}><b>Reference: {payment.reference}</b></div>
                                    <div className={'mb-2'}><b>Description: {payment.description}</b></div>
                                    <div className={'mb-2'}><b>Status: {payment.status === 0 ? 'Pending' : 'Confirmed'}</b></div>
                                </div>
                            </div>
                            <div style={{textAlign: 'left', flexBasis: '50%'}} className={'d-flex'}>
                                <FontAwesomeIcon icon={faPersonBiking} size={"2xl"} className={'pe-3'} color={'#777'}/>
                                <div>
                                    <div className={'mb-2'}><b>Created: {formatTimestamp(payment?.created_at)}</b></div>
                                    <div className={'mb-2'}><b>Updated: {formatTimestamp(payment?.updated_at)}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
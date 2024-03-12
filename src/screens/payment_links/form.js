import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import {Button, Select, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function PaymentLinksForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({reference: 'test'});
    const {state} = useLocation();
    const [currencies, setCurrencies] = useState([]);
    const [billingAccounts, setBillingAccounts] = useState([]);

    useEffect(() => {
        axiosInstance.get('currency/').then((response) => {
            setCurrencies(response.data.results);
        });
        axiosInstance.get('billing_account/').then((response) => {
            setBillingAccounts(response.data.results);
        });
        if(state) {
            state.currency_id = state.currency.id;
            state.billing_account_id = state.billing_account.id;
            setForm(state);
        }
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`payment_link/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Payment Link saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/payment_links');
            });
        } else {
            axiosInstance.post('payment_link/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Payment Link created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/payment_links');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'mb-1'}>Amount</div>
                    <Text value={form.amount} onChange={(value) => setForm({...form, amount: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Currency</div>
                    <Select style={{minWidth: '200px'}} value={form?.currency_id} onChange={(val) => {
                        setForm({...form, currency_id: val[0]});
                    }}
                            options={currencies.map((cur, index) => {return {value: cur.id, name: cur.name}})}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Billing Account</div>
                    <Select style={{minWidth: '200px'}} value={form?.billing_account_id} onChange={(val) => {
                        setForm({...form, billing_account_id: val[0]});
                    }}
                            options={billingAccounts.map((cur, index) => {return {value: cur.id, name: cur.name}})}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Description</div>
                    <TextArea value={form.description} onChange={(value) => setForm({...form, description: value})} label={'Name'}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/payment_links')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
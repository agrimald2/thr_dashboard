import React, {useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import {Button, Select, Text} from "../../ajonjolib/inputs/ajonjolinput";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function BillingAccountForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const {state} = useLocation();

    const submit = () => {
        if(state) {
            axiosInstance.put(`billing_account/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Billing Account saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/billing_accounts');
            });
        } else {
            axiosInstance.post('billing_account/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Billing Account created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/billing_accounts');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Payment Method</div>
                    <Select style={{minWidth: '200px'}} value={form?.payment_method} onChange={(val) => {
                        setForm({...form, payment_method: val[0]});
                    }}
                            options={[
                                {value: 0, name: 'OpenPay'},
                                {value: 1, name: 'Apple Pay'},
                                {value: 2, name: 'Mercadopago'},
                                {value: 3, name: 'Crypto'},
                            ]}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Key 1</div>
                    <Text value={form.key_1} onChange={(value) => setForm({...form, key_1: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Key 2</div>
                    <Text value={form.key_2} onChange={(value) => setForm({...form, key_2: value})} label={'Name'}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/billing_accounts')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
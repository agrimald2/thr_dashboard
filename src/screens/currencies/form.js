import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function CurrencyForm() {
    const [form, setForm] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(state) setForm(state);
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`currency/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Currency saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/currency');
            });
        } else {
            axiosInstance.post('currency/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Currency created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/currency');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'formTitle'}>Currency</div>

                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Symbol</div>
                    <Text value={form.symbol} onChange={(value) => setForm({...form, symbol: value})} placeholder={'symbol'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Conversion (from USD)</div>
                    <Text value={form.conversion_rate} onChange={(value) => setForm({...form, conversion_rate: value})} placeholder={'conversion_rate'}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/currency')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
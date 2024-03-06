import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function CountryForm() {
    const [form, setForm] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setForm(state);
        console.log(state);
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`country/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Country saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/countries');
            });
        } else {
            axiosInstance.post('country/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Country created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/countries');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'formTitle'}>Countries</div>

                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Description</div>
                    <Text value={form.code} onChange={(value) => setForm({...form, code: value})} placeholder={'Code'}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/countries')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
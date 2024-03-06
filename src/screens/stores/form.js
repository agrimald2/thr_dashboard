import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Select, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function StoreForm() {
    const [form, setForm] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if(state) {
            state.country = state.country.map((country) => country);
            setForm(state);
        }

        axiosInstance.get('country').then((response) => {
            setCountries(response.data.results);
        });
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`store/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Store saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/stores');
            });
        } else {
            axiosInstance.post('store/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Store created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/stores');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'formTitle'}>Store</div>

                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Commission</div>
                    <Text value={form.commission} onChange={(value) => setForm({...form, commission: value})} placeholder={'commission'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Countries</div>
                    <Select multi={true} options={countries.map((cat) => {return  {value: cat.id, name: cat.name}})} value={form.country} onChange={(value) => setForm({...form, country: value})}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/stores')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
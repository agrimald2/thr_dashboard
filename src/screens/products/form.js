import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Select, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function ProductForm() {
    const [form, setForm] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if(state) {
            state.subcategory_id = state.subcategory.id;
            state.store_id = state.store.id;
            setForm(state);
        }

        axiosInstance.get('subcategory').then((response) => {
            setSubcategories(response.data.results);
        });

        axiosInstance.get('store').then((response) => {
            setStores(response.data.results);
        });
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`product/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Product saved', ToastTypes.SUCCESS);
                    navigate('/products');
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
            });
        } else {
            axiosInstance.post('product/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Product created', ToastTypes.SUCCESS);
                    navigate('/products');
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'formTitle'}>Product</div>

                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Name UA</div>
                    <Text value={form.name_ua} onChange={(value) => setForm({...form, name_ua: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Name FR</div>
                    <Text value={form.name_fr} onChange={(value) => setForm({...form, name_fr: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Name CH</div>
                    <Text value={form.name_ch} onChange={(value) => setForm({...form, name_ch: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Code</div>
                    <Text value={form.code} onChange={(value) => setForm({...form, code: value})} label={'code'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Brand</div>
                    <Text value={form.brand} onChange={(value) => setForm({...form, brand: value})} label={'brand'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Composition</div>
                    <Text value={form.composition} onChange={(value) => setForm({...form, composition: value})} label={'composition'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Price</div>
                    <Text value={form.price} onChange={(value) => setForm({...form, price: value})} label={'price'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Description</div>
                    <TextArea value={form.description} onChange={(value) => setForm({...form, description: value})} label={'description'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Gender</div>
                    <Select options={[{value: 0, name: 'Female'}, {value: 1, name: 'Male'}, {value: 2, name: 'Any'}]} value={form.gender} onChange={(value) => setForm({...form, gender: value[0]})} label={'gender'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Store</div>
                    <Select options={stores?.map((store) => {return  {value: store.id, name: store.name}})} value={form.store_id} onChange={(value) => setForm({...form, store_id: value[0]})}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Subcategory</div>
                    <Select options={subcategories?.map((cat) => {return  {value: cat.id, name: cat.name}})} value={form.subcategory_id} onChange={(value) => setForm({...form, subcategory_id: value[0]})}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/products')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
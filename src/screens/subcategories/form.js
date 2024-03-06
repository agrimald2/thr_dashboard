import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Table from "../../components/table/table";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Select, Text, TextArea} from "../../ajonjolib/inputs/ajonjolinput";
import axiosInstance from "../../AxiosInstance";
import {toast, ToastTypes} from "../../ajonjolib/toasts/toast/toast";

export default function SubcategoryForm() {
    const [form, setForm] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if(state) {
            state.category_id = state.category.id;
            setForm(state);
        }

        axiosInstance.get('category').then((response) => {
            setCategories(response.data.results);
        });
    }, []);

    const submit = () => {
        if(state) {
            axiosInstance.put(`subcategory/${state.id}/`, form).then((response) => {
                console.log(response);
                if(response.status === 200) {
                    toast('Subcategory saved', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/subcategories');
            });
        } else {
            axiosInstance.post('subcategory/', form).then((response) => {
                console.log(response);
                if(response.status === 201) {
                    toast('Subcategory created', ToastTypes.SUCCESS);
                } else {
                    toast('Request failed', ToastTypes.ERROR);
                }
                navigate('/subcategories');
            });
        }
    }

    return (
        <div>
            <Header/>
            <Sidebar/>

            <div className={'mainContainer'}>
                <div className={'formContainer'}>
                    <div className={'formTitle'}>Subcategory</div>

                    <div className={'mb-1'}>Name</div>
                    <Text value={form.name} onChange={(value) => setForm({...form, name: value})} label={'Name'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Description</div>
                    <TextArea value={form.description} onChange={(value) => setForm({...form, description: value})} placeholder={'description'}/>
                    <div className={'mb-3'}/>
                    <div className={'mb-1'}>Category</div>
                    <Select options={categories.map((cat) => {return  {value: cat.id, name: cat.name}})} value={form.category_id} onChange={(value) => setForm({...form, category_id: value[0]})}/>

                    <div className={'formButtons'}>
                        <Button name={'Cancel'} variant={'danger'} onClick={() => navigate('/subcategories')}/>
                        <Button name={'Save'} className={'ps-3'} variant={'success'} onClick={submit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import Dashboard from "./screens/dashboard/dashboard";
import ProductsList from "./screens/products/list";
import CategoriesList from "./screens/categories/list";
import CountriesList from "./screens/countries/list";
import CurrencyList from "./screens/currencies/list";
import SubcategoriesList from "./screens/subcategories/list";
import StoreList from "./screens/stores/list";
import OrderList from "./screens/orders/list";
import PaymentList from "./screens/payments/list";
import CategoriesForm from "./screens/categories/form";
import CountryForm from "./screens/countries/form";
import CurrencyForm from "./screens/currencies/form";
import SubcategoryForm from "./screens/subcategories/form";
import StoreForm from "./screens/stores/form";
import ProductForm from "./screens/products/form";
import BillingAccounts from "./screens/billing_accounts/list";
import BillingAccountForm from "./screens/billing_accounts/form";
import PaymentLinksList from "./screens/payment_links/list";
import PaymentLinksForm from "./screens/payment_links/form";

function LoginRedirect() {
    useEffect(() => {
        window.location.replace('/login');
    }, []);
    return (<div></div>);
}

export default function RouteContainer() {
    let authenticated = localStorage.getItem('access_token') !== null;

    return (
        <Routes>
            <Route path={'/'} element={<Dashboard/>}/>
            <Route path={'/products'} element={<ProductsList/>}/>
            <Route path={'/products/form'} element={<ProductForm/>}/>
            <Route path={'/categories'} element={<CategoriesList/>}/>
            <Route path={'/categories/form'} element={<CategoriesForm/>}/>
            <Route path={'/countries'} element={<CountriesList/>}/>
            <Route path={'/countries/form'} element={<CountryForm/>}/>
            <Route path={'/currency'} element={<CurrencyList/>}/>
            <Route path={'/currency/form'} element={<CurrencyForm/>}/>
            <Route path={'/subcategories'} element={<SubcategoriesList/>}/>
            <Route path={'/subcategories/form'} element={<SubcategoryForm/>}/>
            <Route path={'/stores'} element={<StoreList/>}/>
            <Route path={'/stores/form'} element={<StoreForm/>}/>
            <Route path={'/orders'} element={<OrderList/>}/>
            <Route path={'/payments'} element={<PaymentList/>}/>
            <Route path={'/billing_accounts'} element={<BillingAccounts/>}/>
            <Route path={'/billing_accounts/form'} element={<BillingAccountForm/>}/>
            <Route path={'/payment_links'} element={<PaymentLinksList/>}/>
            <Route path={'/payment_links/form'} element={<PaymentLinksForm/>}/>
        </Routes>
    );
}
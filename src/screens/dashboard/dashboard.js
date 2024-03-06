import React from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";

export default function Dashboard() {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <h1>Dashboard</h1>
        </div>
    );
}
import React, {useContext} from "react";
import styles from './header.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../MainContext";

export default function Header() {
    const {setSidebarOpen} = useContext(MainContext);

    return (
        <div className={styles.container}>
            <div className={styles.burger} onClick={() => {
                setSidebarOpen((prev) => !prev);
            }}>
                <FontAwesomeIcon icon={faBars} color={'#444'} size={'xl'}/>
            </div>
        </div>
    )
}
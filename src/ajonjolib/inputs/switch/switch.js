import React from "react";
import styles from './switch.module.css';

export default function Switch({value, onChange, className, style, disabled}) {
    return (
        <div className={styles.container} style={style}>
            <div className={styles.label}>{value ? 'Activo' : 'Inactivo'}</div>
            <div className={'d-flex justify-content-center'}>
                <div className={`${styles.switch} ${value ? styles.active : ''}`} onClick={() => {if(onChange) onChange(!value)}}>
                    <div className={styles.toggle}/>
                </div>
            </div>
        </div>
    )
}
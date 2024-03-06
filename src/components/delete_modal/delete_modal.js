import React from "react";
import styles from './delete_modal.module.css';

export default function DeleteModal({children, title, subtitle, close}) {
    return (
        <div className={styles.container}>
            <div className={styles.backdrop} onClick={close}/>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div style={{color: '#000000', fontSize: '18px', fontFamily: '500', lineHeight: '22px'}}>{title}</div>
                        <div style={{color: '#8FA4D6', fontSize: '15px', fontFamily: '400', lineHeight: '13px'}}>{subtitle}</div>
                    </div>
                </div>
                <div style={{
                    color: '#8B8B8B',
                    fontWeight: '400',
                    fontSize: '14px',
                    padding: '24px 32px',
                }}>
                    {children}
                </div>
            </div>
        </div>
    )
}
import React from "react";
import styles from './button.module.css';

export default function Button({onClick, disabled, className, style, name, variant}) {

    const getClass = () => {
        if(variant === 'secondary') {
            return styles.secondary;
        } else if(variant === 'success') {
            return styles.success;
        } else if(variant === 'danger') {
            return styles.danger;
        } else if(variant === 'warning') {
            return styles.warning;
        } else if(variant === 'info') {
            return styles.info;
        } else if(variant === 'light') {
            return styles.light;
        } else if(variant === 'dark') {
            return styles.dark;
        } else if(variant === 'link') {
            return styles.link;
        } else {
            return styles.primary;
        }
    }

    return (
        <div className={className} style={style} onClick={() => {
            if(!disabled) {
                if(onClick) onClick();
            }
        }}>
            <div className={`${styles.container} ${getClass()}`}>
                <div>{name}</div>
            </div>
        </div>
    )
}
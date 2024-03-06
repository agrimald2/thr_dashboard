import React, { useEffect, useState } from "react";
import styles from './checkbox.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Checkbox({ value, onChange, className, style, disabled, label, labelPosition }) {
    const [checked, setChecked] = useState(value);

    useEffect(() => {
        if (disabled === true) {
            setChecked(false);
        }
    }, [disabled]);

    useEffect(() => {
        if (onChange) onChange(checked);
    }, [checked]);

    const renderCheckbox = () => {
        return (
            <div className={styles.checkboxInput}>
                <div className={`${styles.customCheckbox} ${checked ? styles.checked : ""}`} onClick={() => setChecked(!checked)}>
                    <div className={`${styles.checkboxIcon} ${checked ? styles.checked : ""}`}>
                        <FontAwesomeIcon icon={faCheck} color={'#fff'} />
                    </div>
                </div>
            </div>
        );
    }

    const renderVertical = () => {
        return (
            <div className={styles.checkbox} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                {labelPosition === "top" && <div style={{ marginBottom: '8px' }}>{label}</div>}
                {renderCheckbox()}
                {labelPosition === "bottom" && <div style={{ marginTop: '8px' }}>{label}</div>}
            </div>
        );
    }

    const renderHorizontal = () => {
        return (
            <div className={styles.checkbox}>
                {labelPosition === "left" && <div style={{ marginRight: '8px' }}>{label}</div>}
                {renderCheckbox()}
                {(labelPosition === "right" || labelPosition === undefined) && <div style={{ marginLeft: '8px' }}>{label}</div>}
            </div>
        );
    }

    return (
        <div className={className} style={style}>
            {labelPosition === "top" || labelPosition === "bottom" ? renderVertical() : renderHorizontal()}
        </div>
    );
}

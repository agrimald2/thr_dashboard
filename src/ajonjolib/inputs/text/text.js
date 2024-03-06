import React, {useState} from "react";
import styles from "./text.module.css";

export default function Text({ value, onChange, className, style, disabled, placeholder }) {
    const [focused, setFocused] = useState(false);


    return (
        <div className={`${className} ${styles.container}`} style={style}>
            <input style={style} placeholder={placeholder} disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
}
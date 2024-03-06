import React, {useState} from "react";
import styles from "./textarea.module.css";

export default function TextArea({ value, onChange, className, style, disabled, placeholder }) {
    const [focused, setFocused] = useState(false);


    return (
        <div className={`${className} ${styles.container}`} style={style}>
            <textarea style={style} placeholder={placeholder} disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
}
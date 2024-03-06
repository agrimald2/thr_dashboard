import React, {useEffect, useRef, useState} from "react";
import styles from './searchbox.module.css';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SearchBox({ value, onChange, onInput, className, style, disabled, placeholder }) {
    const [searchTerm, setSearchTerm] = useState(value);
    const [focused, setFocused] = useState(false);
    const contentEditableRef = useRef(null);

    useEffect(() => {
        if (onChange) onChange(searchTerm);
    }, [searchTerm]);

    const search = () => {
        if (onInput) onInput(searchTerm);
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            search();
        }
    };

    return (
        <div className={className} style={style}>
            <div className={styles.container}>
                <div
                    style={{
                        color: !focused && !searchTerm ? '#999' : '#000',
                    }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    ref={contentEditableRef}
                    onKeyDown={handleEnterKey}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onInput={(e) => {
                        setSearchTerm(e.currentTarget.textContent);
                    }}
                    className={styles.input}
                >
                    {!focused && !searchTerm && placeholder}
                </div>

                <div className={styles.searchIcon} onClick={() => search()}>
                    <FontAwesomeIcon icon={faSearch} color={'#CCC'} />
                </div>
            </div>
        </div>
    );
}
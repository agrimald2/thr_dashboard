import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faCheck, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import styles from './select.module.css';

export default function Select({ searchable, options, value, onChange, placeholder, className, style, disabled, multi, showQuantity }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const [selectedOptionValues, setSelectedOptionValues] = useState([]);
    const [selectedOptionNames, setSelectedOptionNames] = useState([]);
    const selectedTextRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            // Check if the clicked element is an SVG or its parent is an SVG
            const isSVGClicked = event.target.tagName === 'svg' || event.target.closest('svg');

            if (!isSVGClicked) {
                if (selectedTextRef.current) {
                    selectedTextRef.current.blur();
                }
                setIsOpen(false);
            }
        }
    };

    const toggleOption = (optionValue, optionName) => {
        setSearchTerm('');
        setSelectedText();

        if (optionValue === 'selectAll') {
            const allOptionValues = options?.map(option => option.value);
            // Check if all options are currently selected
            const allSelected = allOptionValues.every(value => selectedOptionValues.includes(value));
            if (allSelected) {
                // If all are selected, deselect all
                setSelectedOptionValues([]);
                setSelectedOptionNames([]);
                if (onChange) onChange([]);
            } else {
                // If not all are selected, select all
                setSelectedOptionValues(allOptionValues);
                setSelectedOptionNames(options?.map(option => option.name));
                if (onChange) onChange(allOptionValues);
            }
        } else if (multi) {
            const index = selectedOptionValues.indexOf(optionValue);
            if (index === -1) {
                const newValues = [...selectedOptionValues, optionValue];
                setSelectedOptionValues(newValues);
                setSelectedOptionNames([...selectedOptionNames, optionName]);
                if (onChange) onChange(newValues);
            } else {
                const newValues = selectedOptionValues?.filter(obtainedValue => obtainedValue !== optionValue);
                setSelectedOptionValues(newValues);
                setSelectedOptionNames(selectedOptionNames?.filter(name => name !== optionName));
                if (onChange) onChange(newValues);
            }
        } else {
            setSelectedOptionValues([optionValue]);
            setSelectedOptionNames([optionName]);
            setIsOpen(false);
            if (onChange) onChange([optionValue]);
        }
    }

    useEffect(() => {
        if (disabled === true) {
            setIsOpen(false);
        }
    }, [disabled]);

    useEffect(() => {
        if (!multi && value !== undefined) {
            const selectedOption = options.find(option => parseInt(option.value) === parseInt(value));
            if (selectedOption) {
                setSelectedOptionValues([selectedOption.value]);
                setSelectedOptionNames([selectedOption.name]);
            }
        } else {
            const selectedOptions = options?.filter(option => value?.includes(option.value));
            if (selectedOptions?.length > 0) {
                setSelectedOptionValues(selectedOptions?.map(option => option.value));
                setSelectedOptionNames(selectedOptions?.map(option => option.name));
            }
        }
    }, [value, multi, options]);

    const filteredOptions = options?.filter(option =>
        option.name.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    const setSelectedText = (text) => {
        if (selectedTextRef.current) {
            selectedTextRef.current.innerHTML = text;
        }
    };

    useEffect(() => {
        if (selectedOptionNames?.length === 0) setSelectedText('Search...');
        else setSelectedText('');
    }, [selectedOptionNames]);

    if (multi) {
        filteredOptions.unshift({
            value: 'selectAll',
            name: 'Select All',
        });
    }

    return (
        <div className={`${styles.container} ${className}`} ref={dropdownRef} style={style}>
            <div
                className={styles.dropdownButton}
                onClick={() => setIsOpen(prev => (!disabled ? !prev : false))}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div>
                        {showQuantity ? (placeholder + " (" + selectedOptionNames?.length.toString() + ")") : selectedOptionNames.join(', ') || placeholder || (!searchable && 'Ninguno')}
                    </div>
                    {searchable && (
                        <div
                            ref={selectedTextRef}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onClick={() => {
                                setSelectedText('');
                                setSearchTerm('');
                                setIsOpen(true);
                            }}
                            onInput={e => {
                                setSelectedText('');
                                setSearchTerm(e.currentTarget.textContent);
                                setIsOpen(true);
                            }}
                            className={styles.searchInput}
                        />
                    )}
                </div>
                <div style={{ paddingLeft: '0.5rem' }}>
                    {isOpen ? <FontAwesomeIcon icon={faCaretUp} color={'#F32735'}/> : <FontAwesomeIcon icon={faCaretDown} color={'#F32735'} />}
                </div>
            </div>

            <div className={`${styles.dropdownOptions} ${isOpen ? styles.show : ''}`}>
                {filteredOptions?.map((option, index) => (
                    <div
                        key={index}
                        className={`${styles.option} ${
                            selectedOptionValues.includes(option.value) ? styles.selected : ''
                        }`}
                        onClick={() => toggleOption(option.value, option.name)}
                    >
                        {multi && option.value === 'selectAll' ? (
                            // Render "Select All" or "Deselect All" based on selection status
                            selectedOptionValues?.length === options?.length ? 'Deselect All' : 'Select All'
                        ) : (
                            <React.Fragment>
                                {multi && (
                                    <div className={`${styles.checkbox} ${
                                        selectedOptionValues.includes(option.value) ? styles.selected : ''
                                    }`}>
                                        {selectedOptionValues.includes(option.value) && (
                                            <FontAwesomeIcon icon={faCheck} color={'#FFF'} />
                                        )}
                                    </div>
                                )}
                                {option.name}
                            </React.Fragment>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

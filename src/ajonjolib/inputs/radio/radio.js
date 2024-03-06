import React, {useEffect, useState} from "react";
import styles from './radio.module.css';

function RadioInput({name, value, checked, onChange}) {
    return (
        <label>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {value}
        </label>
    );
}

function RadioGroup({name, children, value, onChange, className, style, labelPosition}) {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        if(onChange) {
            onChange(currentValue);
        }
    }, [currentValue]);

    return (
        <div className={className} style={style}>
            <div>{name}</div>
            <div>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === RadioInput) {
                        return React.cloneElement(child, {
                            name: name,
                            checked: child.props.value === value,
                            onChange: () => setCurrentValue(child.props.value),
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    )
}

const Radio = {
    Group: RadioGroup,
    Input: RadioInput,
};

export default Radio;
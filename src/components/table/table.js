import React, {useEffect, useState} from "react";
import styles from './table.module.css';
import axiosInstance from "../../AxiosInstance";
import {useNavigate} from "react-router-dom";

export default function Table({cols, withIndex, model, create}) {
    const [query, setQuery] = useState('');
    const [rows, setRows] = useState([]);
    const [timer, setTimer] = useState(null);
    const navigate = useNavigate();

    const getValueFromString = (object, accessString) => {
        let accessParts = accessString.split(".");
        let value = object;

        for (let i = 0; i < accessParts?.length; i++) {
            if (!value) {
                return "";
            }
            let accessPart = accessParts[i];
            value = value[accessPart];
        }

        return value;
    }

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            const url = `${model}/?name=${query}`;
            axiosInstance.get(url).then((response) => {
                let results = response.data.results ? response.data.results : response.data
                setRows(results);
            });
        }, 400);

        setTimer(newTimer);

    }, [model, query]);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.searchbar}>
                    <input
                        placeholder={'Search'}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                {create && <div className={styles.addContainer} onClick={() => navigate(create)}>+ Add</div>}
            </div>

            <div className={styles.body}>
                <table className={`${styles.table} table table-hover`}>
                    <thead>
                    <tr>
                        {withIndex && <th>N°</th>}
                        {cols?.map((col, index) => (
                            <th key={index}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {withIndex && <td style={{color: 'var(--secondary-color)', fontWeight: '600'}}>{rowIndex + 1}</td>}
                            {cols?.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.image ?
                                        <img src={getValueFromString(row,col.image.url)} alt={col.title} width={"50px"} height={"50px"} style={{borderRadius: "5px", objectFit: "contain", backgroundColor: "#F7F8F9"}}/>
                                        :
                                        <>
                                            { col.code ? <>{col.code(row, getValueFromString(row, col.internal))}</>
                                                :
                                                <span>{getValueFromString(row, col.internal)}</span>
                                            }
                                            </>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
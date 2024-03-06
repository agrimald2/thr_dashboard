import React, {useEffect, useRef, useState} from "react";
import styles from './toast_container.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {eventBus, ToastTypes} from "./toast";

export default function ToastContainer() {
    const [text, setText] = useState("");
    const [type, setType] = useState(ToastTypes.SUCCESS);
    const [show, setShow] = useState(false);
    const progressBarRef = useRef(null);
    const maxTime = 5000;

    const getBackgroundColor = () => {
        if(type === ToastTypes.ERROR) {
            return styles.toastError;
        } else if(type === ToastTypes.INFO) {
            return styles.toastInfo
        } else if(type === ToastTypes.WARNING) {
            return styles.toastWarning
        } else if(type === ToastTypes.DARK_SUCCESS || type === ToastTypes.DARK_ERROR) {
            return styles.toastDark;
        }

        return styles.toastSuccess;
    }

    const progressBarColor = () => {
        if(type === ToastTypes.ERROR) {
            return styles.progressBarError;
        } else if(type === ToastTypes.INFO) {
            return styles.progressBarInfo;
        } else if(type === ToastTypes.WARNING) {
            return styles.progressBarWarning;
        } else if(type === ToastTypes.DARK_SUCCESS) {
            return styles.progressBarDarkSuccess;
        } else if(type === ToastTypes.DARK_ERROR) {
            return styles.progressBarDarkError;
        }

        return styles.progressBarSuccess;
    }

    useEffect(() => {
        eventBus.subscribe('showToast', (data) => {
            setText(data.message);
            setType(data.type);
            setShow(true);
        });
    }, []);

    useEffect(() => {
        if (show) {
            // Start a 5-second timer
            const timer = setTimeout(() => {
                setShow(false); // When the timer is finished, set show to false
            }, maxTime);

            // Update the progress bar during the 5-second timer
            let startTime = Date.now();
            const updateProgressBar = () => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const progressBar = progressBarRef.current;

                if (progressBar) {
                    const percentage = ((maxTime - elapsedTime) / maxTime) * 100; // Calculate the percentage of time passed
                    progressBar.style.width = `${percentage}%`; // Update the progress bar width
                }

                if (elapsedTime < maxTime) {
                    requestAnimationFrame(updateProgressBar); // Keep updating until 5 seconds are up
                }
            };

            updateProgressBar();

            return () => {
                clearTimeout(timer); // Clear the timer if the component unmounts before it finishes
            };
        }
    }, [show]);


    return (
        <div className={`${styles.container} ${styles.toastBottomRight} ${getBackgroundColor()}`} style={{
            display: show ? 'flex' : 'none'
        }}>
            <div className={styles.closeButton} onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faX} size={'xs'} color={'#ffffff'}/>
            </div>
            <div>{text}</div>
            <div ref={progressBarRef} className={`${styles.progressBar} ${progressBarColor()}`}/>
        </div>
    )
}
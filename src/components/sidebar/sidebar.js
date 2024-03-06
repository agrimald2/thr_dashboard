import React, {useContext, useEffect, useState} from "react";
import styles from './sidebar.module.css';
import MainContext from "../../MainContext";
import {
    faAngleDown,
    faAngleUp,
    faBox,
    faCog,
    faCoins, faDashboard,
    faGlobe,
    faMoneyBill, faMoneyBills,
    faShop, faStar
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export default function Sidebar() {
    const {sidebarOpen} = useContext(MainContext);
    const navigate = useNavigate();

    const [menu, setMenu] = useState([
        { name: 'Dashboard', items: [], icon: faDashboard, isOpen: false },
        { name: 'Ecommerce', items: [
                {name: 'Products', icon: faBox, url: '/products'},
                {name: 'Stores', icon: faShop, url: '/stores'},
                {name: 'Categories', icon: faStar, url: '/categories'},
                {name: 'Subcategories', icon: faStar, url: '/subcategories'},
            ], icon: faShop, isOpen: false},
        { name: 'Sales', items: [
                {name: 'Orders', icon: faShop, url: '/orders'},
                {name: 'Payments', icon: faMoneyBill, url: '/payments'},
            ], icon: faMoneyBills, isOpen: false },
        { name: 'Configuration', items: [
                {name: 'Countries', icon: faGlobe, url: '/countries'},
                {name: 'Currencies', icon: faCoins, url: '/currency'},
            ],
            icon: faCog, isOpen: false },
    ]);

    useEffect(() => {
        if(sidebarOpen) {
            document.documentElement.style.setProperty('--sidebar-width', '250px');
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '20px');
        }
    }, [sidebarOpen]);

    return (
        <div className={styles.container}>
            {menu.map((item, index) => {
                return (
                    <div key={index}>
                        <div className={styles.menuItem} onClick={() => {
                            let copy = menu[index];
                            copy.isOpen = !copy.isOpen;
                            menu[index] = copy;
                            setMenu([...menu])
                        }}>
                            <div className={'d-flex align-items-center'}>
                                <FontAwesomeIcon className={'pe-2'} icon={item.icon} size={'xm'}/>
                                <div>{item.name}</div>
                            </div>
                            {item.items.length > 0 && <FontAwesomeIcon icon={item.isOpen ? faAngleUp : faAngleDown} size={'sm'} />}
                        </div>
                        {item.isOpen && item.items.map((subItem, subIndex) => (
                            <div key={subIndex} className={styles.subItem} onClick={() => navigate(subItem.url)}>
                                <FontAwesomeIcon className={'pe-2'} icon={subItem.icon} size={'sm'}/>
                                <div>{subItem.name}</div>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    );
}
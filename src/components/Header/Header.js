import React from 'react';
import style from "./Header.module.css";
import AddNewItemForm from "../AddNewItemsForm/AddNewItemForm";


function Header(props) {
    return (
        <div className={style.header}>
            <div className={style.container}>
                <div className={style.logo}>
                    {/*<img src="" alt=""/>*/}
                </div>
                <div className={style.headerItem}>
                    <AddNewItemForm addItem={props.addItem}/>
                </div>
            </div>
        </div>
    )
}

export default Header


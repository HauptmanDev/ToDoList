import React from 'react';
import style from "./Header.module.css";
import AddNewItemForm from "./AddNewItemsForm/AddNewItemForm";


function Header(props) {
    return (
        <div className={style.header}>
            <div className={style.headerItem}>
                <AddNewItemForm addItem={props.addItem}/>
            </div>
        </div>
    )
}

export default Header


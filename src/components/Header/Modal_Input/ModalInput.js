import React from 'react';
import style from './ModalInput.module.css'

const Modal = ({children, show, blackout}) => {

    if (show) return null;

    return (
        <div>
            {blackout && <div className={style.background}></div>}
            <div className={style.children}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

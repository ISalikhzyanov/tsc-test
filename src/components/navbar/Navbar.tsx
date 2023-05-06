import React, {useState} from 'react';
import './navbar.css'
import menu from '../../assets/img/three-dots-vertical.svg'
import Modal from "../modal/Modal";

function Navbar() {
    const [modal, setModal] = useState<boolean>(false);
    const handleClick = () => {
        setModal(!modal)
    }
    return (
        <div className="navbar">
            <h2>Мой проект</h2>
            <div className="navbar__btn-group">
                <button className="navbar__btn" onClick={handleClick}>
                    В корзину
                </button>
                <div className="navbar__menu">
                    <img src={menu} alt=""/>
                </div>
            </div>
            { modal &&  <Modal showOrHide={() => handleClick()}>
                <div className="navbar__modal-content">
                    <span>Продукт успешно добавлен в корзину</span>
                    <button className="navbar__modal-btn">Перейти в корзину</button>
                </div>
            </Modal> }
        </div>
    );
}

export default Navbar;

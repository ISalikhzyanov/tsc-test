import React from 'react';
import './slides-menu.css'
import {useDispatch, useSelector} from "react-redux";
import {selectMenuItem} from "../../redux/actions";
import {IState} from "../../types/types";

function SlidesMenu() {
    const selectedType = useSelector((state: IState) => state.app.selectedMenuItem)
    const dispatch = useDispatch()
    const isActive = (type: string) => {
        if (type === selectedType) {
            return "menu__active-item"
        } else {
            return "menu__item"
        }
    }

    const chooseSelectedItem = (type: string) => {
        dispatch(selectMenuItem(type))
    }
    return (
        <div className="menu">
            <div className={isActive('gallery')} onClick={() => chooseSelectedItem('gallery')}>
                <span>Галерея</span>
            </div>
            <div className={isActive('templates')} onClick={() => chooseSelectedItem('templates')}>
                <span>Шаблоны</span>
            </div>
            <div className={isActive('fond')} onClick={() => chooseSelectedItem('fond')}>
                <span>Фон</span>
            </div>
        </div>
    );
}

export default SlidesMenu;

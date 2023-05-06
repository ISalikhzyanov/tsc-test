import React from 'react';
import './modal.css'
import closeBtn from '../../assets/img/close-btn.svg'

function BasePopup({ children, showOrHide }: any) {
    return (
        <div className="base-popup" onClick={showOrHide}>
            <div className="base-popup__content" onClick={(event) => event.stopPropagation()}>
                <div
                    className="base-popup__close-btn"
                    onClick={showOrHide}
                >
                    <img src={ closeBtn } />
                </div>
                { children }
            </div>
        </div>
    );
}

export default BasePopup;

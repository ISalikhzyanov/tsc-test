import React, {useEffect, useState} from 'react';
import './carousel.css'
import prevButton from '../../assets/img/chevron-left.svg'
import nextButton from '../../assets/img/chevron-right.svg'
import {useDispatch, useSelector} from "react-redux";
import {changePage, getSlideImages} from "../../redux/actions";
import Modal from "../modal/Modal";
import {IImage, IState} from "../../types/types";

function Carousel({ image }: any) {
    const slides = useSelector((state: IState) => state.slides.slides)
    const page = useSelector((state: IState) => state.slides.page)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentImage, setCurrentImage] = useState<IImage>();
    const [modal, setModal] = useState<boolean>(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const lastIndex = slides.length - 1;
        if (currentIndex < 0) {
            setCurrentIndex(lastIndex)
        }
        if (currentIndex > lastIndex) {
            setCurrentIndex(0);
        }

    }, [currentIndex]);

    useEffect(()=> {
        console.log(slides)
    }, [slides])

    const clickPrev = () => {
        setCurrentIndex(prevState => prevState - 1)
        dispatch(changePage(page - 1))
        if (page === 0){
            dispatch(changePage(slides.length - 1))
        }
    }
    const clickNext = () => {
        setCurrentIndex(prevState => prevState + 1)
        dispatch(changePage(page + 1))
        if (page === slides.length - 1) {
            dispatch(changePage(0))
        }
    }

    const handleSelect = (item: any) => {
        setCurrentImage(item)
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
    }

    const handleDrop = () => {
        dispatch(getSlideImages(image))
    }

    return (
        <section className='section'>
            { modal && <Modal showOrHide={() => hideModal()}>
               <div className="section__modal-content">
                   {/*// @ts-ignore*/}
                   <img className="section__modal-image" src={currentImage.url} width="" height=""/>
               </div>
            </Modal>}
            <div
                className='section-center'
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {slides.map((slide: any, personIndex: number) => {
                    let position = 'nextSlide';
                    if (personIndex === currentIndex) {
                        position = 'activeSlide';
                    }

                    if (personIndex === currentIndex - 1 || (currentIndex === 0 && personIndex === slides.length - 1)) {
                        position = 'lastSlide';
                    }

                    return (
                        <article className={position} key={slide.id}>
                            { slide.images?.length === 0 && <span>Добавьте файлы</span> }
                            <div className="slide__images-box">
                                { slide.images?.length > 0 && slide.images.map((image : any) => {
                                    return <div
                                        key={image.id}
                                        style={slide.images?.length === 0 ? {width: '100%'} : {width: 'calc(50% - 10px)'}}
                                        onClick={() => handleSelect(image)}
                                    >
                                        <img className="slide__image" src={image.url} alt="" />
                                    </div>
                                }) }
                            </div>
                        </article>
                    )
                })}
            </div>
            <div className="slide__btn-group">
                <button className='prev' onClick={clickPrev}>
                    <img src={prevButton} alt=""/>
                </button>
                <span>Страница {currentIndex + 1}</span>
                <button className='next' onClick={clickNext}>
                    <img src={nextButton} alt=""/>
                </button>
            </div>
        </section>
    );
}

export default Carousel;

import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import './App.css';
import book from './assets/img/book-fill.svg'
import Navbar from "./components/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {addToFondArray, addToGalleryArray, addToTemplatesArray, clearAll, getSlideImages} from "./redux/actions";
import closeImage from './assets/img/x.svg';
import removeImage from './assets/img/trash3-fill.svg'
import fullscreenImage from './assets/img/arrows-fullscreen.svg'
import SlidesMenu from "./components/slidedes-menu/SlidesMenu";
import Carousel from "./components/carousel/Carousel";
import {IImage, IState} from "./types/types";

function App() {
  const imageRef: MutableRefObject<any> = useRef()
  const dispatch = useDispatch()
  const galleryImagesArray = useSelector((state: IState) => state.images.galleryImages)
  const templatesImagesArray = useSelector((state: IState) => state.images.templatesImages)
  const fondImages = useSelector((state: IState) => state.images.fondImages)
  const selectedItem = useSelector((state: IState) => state.app.selectedMenuItem)
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [dragableImage, setDragableImage] = useState<IImage>();
  const selectedType = () => {
    if (selectedItem === 'gallery'){
      return galleryImagesArray
    } else if (selectedItem === 'templates') {
      return templatesImagesArray
    } else {
      return fondImages
    }
  }

  const isFullscreen = () => {
    if (fullscreen) {
      return 'helpers-fullscreen'
    } else {
      return 'helpers'
    }
  }
  const [image, setImage] = useState<string | null>(null)
  const [loadingProcess, setLoadingProcess] = useState<number>(0);
  const [imageLoader, setImageLoader] = useState<boolean>(true);
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    setImageLoader(true)
    const interval = setInterval(()=>{
      setLoadingProcess((prevState) => prevState + 1)
    }, 20)
    // @ts-ignore
    setImage(fileReader.result)
    setTimeout(()=> {
      setImageLoader(false)
      clearInterval(interval)
      setLoadingProcess(0)
      if (selectedItem === 'gallery'){
        // @ts-ignore
        dispatch(addToGalleryArray(fileReader.result))
      } else if (selectedItem === 'templates') {
        // @ts-ignore
        dispatch(addToTemplatesArray(fileReader.result))
      } else {
        // @ts-ignore
        dispatch(addToFondArray(fileReader.result))
      }
      setImage(null)
    }, 2000)
  }
  const handleChange = (e: any) => {
    e.preventDefault()
    const file = e.target.files[0]
    fileReader.readAsDataURL(file)
  }

  const handleClick = () => {
    imageRef.current.click()
  }

  const addInSlide = (item: IImage) => {
    const image = {...item}
    image.id = Date.now()
    dispatch(getSlideImages(image))
  }

  const handleDragStart = (item: IImage) => {
    const image = {...item}
    image.id = Date.now()
    setDragableImage(image)
  }

  const handleClear = () => {
    dispatch(clearAll())
  }

  return (
    <div className="App">
      <Navbar />
        <div>
          <div className="expand">
            <img src={book} alt=""/>
          </div>
          <div className="slide">
            <Carousel image={dragableImage}/>
          </div>
          <div className={isFullscreen()}>
            <SlidesMenu />
            <div className="helpers__btns">
              <div className="btns-group">
                <button className="helpers__btn" onClick={handleClear}>
                  <img src={closeImage} />
                  <span>Очистить</span>
                </button>
                <button className="helpers__btn">
                  <img src={removeImage} />
                  <span>Выбрать</span>
                </button>
              </div>
              <div className="helpers__fullscreen" onClick={() => setFullscreen(!fullscreen)}>
                <img src={fullscreenImage} width="16" height="16"/>
                <span>{fullscreen ? "Свернуть" : 'Развернуть' }</span>
              </div>
            </div>
            <input
                ref={imageRef}
                className="image-picker"
                type="file"
                onChange={handleChange}
            />
            <div className="image-wrapper">
              <div className="selected-image-box" onClick={handleClick}>
                {image
                    ?
                    <div className="picked-image-box">
                      <img style={imageLoader ? {opacity: 0.7} : {}} src={image} alt="" width="119" height="99"/>
                      {imageLoader &&
                          <div className="loader-outer">
                            <div className="loader-inner" style={{width: `${loadingProcess}%`}}/>
                          </div>}
                    </div>
                    :
                    <span>Добавить фотографию</span>
                }
              </div>
              {selectedType().map((item: any) => {
                return <img
                    draggable="true"
                    src={item.url}
                    key={item.id}
                    onClick={() => addInSlide(item)}
                    onDragStart={() => handleDragStart(item)}
                    onDragOver={(e) => e.preventDefault()}
                    width="120"
                    height="100"
                />
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

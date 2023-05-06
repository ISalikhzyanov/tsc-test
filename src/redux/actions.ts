import {
    ADD_TO_FOND_IMAGES_ARRAY,
    ADD_TO_GALLERY_IMAGES_ARRAY,
    ADD_TO_TEMPLATES_IMAGES_ARRAY, CHANGE_PAGE, CLEAR_ALL, GET_SLIDE_IMAGE,
    SELECTED_ITEM
} from "./types";
import {useSelector} from "react-redux";


export function addToGalleryArray (item: string) {
    return {
        type: ADD_TO_GALLERY_IMAGES_ARRAY,
        payload: item
    }
}

export function addToTemplatesArray (item: string) {
    return {
        type: ADD_TO_TEMPLATES_IMAGES_ARRAY,
        payload: item
    }
}

export function clearAll () {
    return {
        type: CLEAR_ALL
    }
}

export function addToFondArray (item: any) {
    return {
        type: ADD_TO_FOND_IMAGES_ARRAY,
        payload: item
    }
}

export function getSlideImages (image: any){
    return {
        type: GET_SLIDE_IMAGE,
        payload: image
    }
}

export function changePage (page: number) {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export function selectMenuItem (item: string) {
    return {
        type: SELECTED_ITEM,
        payload: item
    }
}

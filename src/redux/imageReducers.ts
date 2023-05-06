import {ADD_TO_FOND_IMAGES_ARRAY, ADD_TO_GALLERY_IMAGES_ARRAY, ADD_TO_TEMPLATES_IMAGES_ARRAY} from "./types";
import {IImageState} from "../types/types";


const initialState: IImageState = {
    galleryImages: [],
    templatesImages: [],
    fondImages: []
}

export const imageReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_GALLERY_IMAGES_ARRAY:
            return {...state, galleryImages: [...state.galleryImages, {url: action.payload, id: state.galleryImages.length + 1}]}
        case ADD_TO_TEMPLATES_IMAGES_ARRAY:
            return {...state, templatesImages: [...state.templatesImages, {url: action.payload, id: state.templatesImages.length + 1}]}
        case ADD_TO_FOND_IMAGES_ARRAY:
            return {...state, fondImages: [...state.fondImages, {url: action.payload, id: state.fondImages.length + 1}]}
        default:
            return state
    }
}

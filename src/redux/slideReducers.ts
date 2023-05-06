import {CHANGE_PAGE, CLEAR_ALL, GET_SLIDE_IMAGE} from "./types";
import {ISlidesState} from "../types/types";


const initialState: ISlidesState = {
    slides: [
        {
            id: '001',
            images: []
        },
        {
            id: '002',
            images: []
        },
        {
            id: '003',
            images: []
        },
        {
            id: '004',
            images: []
        }
    ],
    page: 0
}

export const slideReducers = (state = initialState, action: any) => {
    switch (action.type){
        case CHANGE_PAGE:
            return {...state, page: action.payload}
        case GET_SLIDE_IMAGE:
            const newArr = Array.from(state.slides)
            // @ts-ignore
            newArr[state.page].images.push(action.payload)
            return {...state, slides: newArr}
        case CLEAR_ALL:
            const clearedArr = Array.from(initialState.slides)
            clearedArr.forEach((clearedItem: any) => clearedItem.images.length = 0)
            return {...state, slides: clearedArr}
        default: return {...state}
    }
}

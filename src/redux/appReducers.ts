import {SELECTED_ITEM} from "./types";
import {IAppState} from "../types/types";

const initialState: IAppState = {
    selectedMenuItem:  'gallery'
}

export const appReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case SELECTED_ITEM:
            return {...state, selectedMenuItem: action.payload}
        default:
            return state
    }
}

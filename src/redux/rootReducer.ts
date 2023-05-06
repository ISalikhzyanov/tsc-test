import {combineReducers} from "redux";
import {imageReducers} from "./imageReducers";
import {appReducers} from "./appReducers";
import {slideReducers} from "./slideReducers";

export const rootReducer = combineReducers({
    images: imageReducers,
    app: appReducers,
    slides: slideReducers
})

import { combineReducers } from "redux";
import settings from "src/GoogleCrafter/redux/settings/reducer";
import addItem from "src/GoogleCrafter/redux/addItem/reducer";
import generations from "src/GoogleCrafter/redux/generations/reducer";


export default combineReducers({ settings, addItem, generations });
import { combineReducers } from "redux";
import loading from "src/GoogleCrafter/redux/loading/reducer";
import settings from "src/GoogleCrafter/redux/settings/reducer";
import addItem from "src/GoogleCrafter/redux/addItem/reducer";
import generations from "src/GoogleCrafter/redux/generations/reducer";


export default combineReducers({ loading, settings, addItem, generations });

import { combineReducers } from "redux";
import settings from "src/GoogleCrafter/redux/settings/reducer";
import addItem from "src/GoogleCrafter/redux/addItem/reducer";


export default combineReducers({ settings, addItem });
import { combineReducers } from "redux";
import App from "src/App/redux/reducer";
import Auth from "src/Authorization/redux/reducer";
import themeSwitcher from "src/lib/ThemeSwitcher/redux/reducer";
import drawer from "src/Drawer/redux/drawer/reducer";
import googleCrafter from "src/GoogleCrafter/redux/root-reducer";


export default combineReducers({
  Auth,
  App,
  drawer,
  googleCrafter,
  themeSwitcher,
});

import { combineReducers } from "redux";
import App from "src/redux/app/reducer";
import Auth from "src/redux/auth/reducer";
import Mails from "src/redux/mail/reducer";
import Calendar from "src/redux/calendar/reducer";
import Box from "src/redux/box/reducer";
import Notes from "src/redux/notes/reducer";
import Todos from "src/redux/todos/reducer";
import Contacts from "src/redux/contacts/reducer";
import Cards from "src/redux/card/reducer";
import Chat from "src/redux/chat/reducers";
import DynamicChartComponent from "src/redux/dynamicEchart/reducer";
import Ecommerce from "src/redux/ecommerce/reducer";
import ThemeSwitcher from "src/redux/themeSwitcher/reducer";
import Invoices from "src/redux/invoice/reducer";
import LanguageSwitcher from "src/redux/languageSwitcher/reducer";
import YoutubeSearch from "src/redux/youtubeSearch/reducers";
import Articles from "src/redux/articles/reducers";
import Investors from "src/redux/investors/reducers";
import scrumBoard from "src/redux/scrumBoard/reducer";
import drawer from "src/redux/drawer/reducer";
import modal from "src/redux/modal/reducer";
import profile from "src/redux/profile/reducer";
import githubSearch from "src/redux/githubSearch/reducers";
import quiz from "src/redux/quiz/reducer";
import googleCrafter from "src/redux/googleCrafter/reducer";


export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  Chat,
  DynamicChartComponent,
  Ecommerce,
  Invoices,
  YoutubeSearch,
  Articles,
  Investors,
  scrumBoard,
  modal,
  drawer,
  profile,
  githubSearch,
  quiz,
  googleCrafter,
});

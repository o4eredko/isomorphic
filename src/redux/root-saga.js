import { all }            from "redux-saga/effects";
import authSagas          from "src/redux/auth/saga";
import contactSagas       from "src/redux/contacts/saga";
import invoicesSagas      from "src/redux/invoice/saga";
import mailSagas          from "src/redux/mail/saga";
import notesSagas         from "src/redux/notes/saga";
import todosSagas         from "src/redux/todos/saga";
import ecommerceSaga      from "src/redux/ecommerce/saga";
import cardsSagas         from "src/redux/card/saga";
import chatSagas          from "src/redux/chat/sagas";
import youtubeSearchSagas from "src/redux/youtubeSearch/sagas";
import githubSagas        from "src/redux/githubSearch/sagas";
import articles           from "src/redux/articles/sagas";
import investors          from "src/redux/investors/sagas";
import scrumBoardSaga     from "src/redux/scrumBoard/saga";
import profileSaga        from "src/redux/profile/saga";
import quizSaga           from "src/redux/quiz/saga";
import googleCrafterSaga  from "src/redux/googleCrafter/saga";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    githubSagas(),
    articles(),
    investors(),
    scrumBoardSaga(),
    profileSaga(),
    quizSaga(),
    googleCrafterSaga()
  ]);
}

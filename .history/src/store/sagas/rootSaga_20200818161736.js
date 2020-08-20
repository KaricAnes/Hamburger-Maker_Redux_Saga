import { takeEvery } from "redux-saga/effects";
import { logoutSaga, checkAuthTimoutSaga } from "./authSagas";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  debugger; //2
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(
    actionTypes.CHECK_TIMEOUT_INITIATE,
    logoucheckAuthTimoutSagatSaga
  );
  //takeEvery prima 2 argumenta i slusa actionCreator kada ce se okinuti u authA.js
  //kada se on okine, takeEvery to 'cuje' i pozove drugi arg logoutSaga-u
  //listener koji ceka 1. argument da okine ovaj drugi
  //takeEvery sets our listener from Redux Saga
}

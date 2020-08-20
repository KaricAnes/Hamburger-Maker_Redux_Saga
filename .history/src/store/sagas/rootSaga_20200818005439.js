import { takeEvery } from "redux-saga/effects";
import { logoutSaga } from "./authSagas";
import * as actionTypes from "../actions/actionTypes";

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); 
  //takeEvery prima 2 argumenta i slusa actionCreator kada ce se okinuti u authA.js
  //kada se on okine, takeEvery to 'cuje' i pozo
}

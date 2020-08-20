import { takeEvery } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./authSagas";
import * as actionTypes from "../actions/actionTypes";
import { fetchIngredientsSaga } from "./burgerBuilderSagas";

export function* watchAuth() {
  debugger; //2
  yield takeEvery(actionTypes.AUTH_INITIATE, authSaga);
  yield takeEvery(actionTypes.CHECK_TIMEOUT_INITIATE, checkAuthTimoutSaga); //okinuti su u index.js-u
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE_INITIATE, authCheckStateSaga);
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_INITIATE, fetchIngredientsSaga);

  //takeEvery prima 2 argumenta i slusa actionCreator kada ce se okinuti u authA.js
  //kada se on okine, takeEvery to 'cuje' i pozove drugi arg logoutSaga-u
  //listener koji ceka 1. argument da okine ovaj drugi
  //takeEvery sets our listener from Redux Saga
}

export function* watchBurgerBuilder() {
  debugger; //2

  yield takeEvery(actionTypes.FETCH_INGREDIENTS_INITIATE, fetchIngredientsSaga);

  //takeEvery prima 2 argumenta i slusa actionCreator kada ce se okinuti u authA.js
  //kada se on okine, takeEvery to 'cuje' i pozove drugi arg logoutSaga-u
  //listener koji ceka 1. argument da okine ovaj drugi
  //takeEvery sets our listener from Redux Saga
}

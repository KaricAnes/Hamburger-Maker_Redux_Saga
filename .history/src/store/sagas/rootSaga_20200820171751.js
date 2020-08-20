import { takeEvery } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./authSagas";
import * as actionTypes from "../actions/actionTypes";
import { fetchIngredientsSaga } from "./burgerBuilderSagas";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orderSagas";

export function* watchAuth() {
  //2 //yield all([])
  yield takeEvery(actionTypes.AUTH_INITIATE, authSaga);
  yield takeEvery(actionTypes.CHECK_TIMEOUT_INITIATE, checkAuthTimoutSaga); //okinuti su u index.js-u
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE_INITIATE, authCheckStateSaga);

  //takeEvery prima 2 argumenta i slusa actionCreator kada ce se okinuti u authA.js
  //kada se on okine, takeEvery to 'cuje' i pozove drugi arg logoutSaga-u
  //listener koji ceka 1. argument da okine ovaj drugi
  //takeEvery sets our listener from Redux Saga
}

export function* watchBurgerBuilder() {
  //2
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_INITIATE, fetchIngredientsSaga);
}

export function* watchOrders() {
  //2
  yield takeEvery(actionTypes.PURCHASE_BURGER_INITIATE, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INITIATE, fetchOrdersSaga);
}

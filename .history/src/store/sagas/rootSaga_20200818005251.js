import { takeEvery } from "redux-saga/effects";
import { logoutSaga } from "./authSagas";
import * as actionTypes from "../actions/actionTypes";

function* watchAuth() {
    yield takeEvery
}

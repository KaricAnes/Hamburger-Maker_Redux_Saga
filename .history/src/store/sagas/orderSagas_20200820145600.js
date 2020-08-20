import { put } from "redux-saga/effects"; //da bismo mogli returnati type u funkciji logout() koji ce ici do reducera
//put ce na kraju kraju dispatchati novu akciju
import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import axios from "axios";

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart());
  const response = yield axios.post("/orders.json?auth=" + token, orderData);
  yield console.log(response.data); //data: {name: "-MCgLRJDOBgJ0xFVHdv5"}   ovo je orderID
  try{
    yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
  }
  

}

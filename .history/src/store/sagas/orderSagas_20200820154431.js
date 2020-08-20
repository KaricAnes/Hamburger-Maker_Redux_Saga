import { put } from "redux-saga/effects"; //da bismo mogli returnati type u funkciji logout() koji ce ici do reducera
//put ce na kraju kraju dispatchati novu akciju
import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield console.log(response.data); //data: {name: "-MCgLRJDOBgJ0xFVHdv5"}   ovo je orderID
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}


export function fetchOrdersSaga(action){ //token, userId
    yield put(actions.fetchOrdersStart());
    
      try{
        const queryParam =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const response = yield axios.get("/orders.json" + queryParams);
        const fetchedOrders = [];

        for (let key in response.data) {
          //response.data: //data:{MCqw5i8QspVXsWqlsmz{ingredients:{}, price:3.6 itd...},{MCqw5i8QspVXsWqlsmz{ingredients:{}, price:3.6 itd...} }
          //debugger;
          fetchedOrders.push({
            ...response.data[key],
            id: key, //ovaj id ce nam biti key za svaku narudzbu   "-MCqw5i8QspVXsWqlsmz"
            /*
            fetchedOrders [{
            id: "-MCqw5i8QspVXsWqlsmz"
            ingredients: {bacon: 1, cheese: 1, kecap: 0, meat: 0, salad: 1}
            orderData: {country: "bih", deliveryMethod: "fastest", email: "a.k@gmail.com", name: "f", street: "f", …}
            price: 3.5
            userId: "dSfmP8KgsnVhS9ZNQ1lyT5EM5d73"
            }]
            */
          });
        }
        //--------------------------transformingData

        dispatch(actions.fetchOrdersSuccess(fetchedOrders)); //kada nam dodju ordersi okinemo ovu funkciju, fetchedOrders su transformed iznad
      } catch(err) {
        yield put(actions.fetchOrdersFailed(err));
      }
      

}

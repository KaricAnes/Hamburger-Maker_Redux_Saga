//ovo nije bilo kada smo radili sa sinq ili asinq kodom u actionCreators.
//Akcija se primala samo u reduceru. Doduse
//Saga is kind of function -> zvjezdica funkciju pretvara u generator
//Generators are next generation JS features which can be executed incrementally tako da ih mozemo
//pozvati a da se ne ranaju from start to end immidietly
//nego mozemo pauzirati tokom function execution npr. (mozemo cekati da se asinq kod zavrsi)
//i to je upravo ono gdje redux saga takes advantage
//a ako imamo sinq kod, onda mozemo executati from start to end immidiatelly

import { put } from "redux-saga/effects"; //da bismo mogli returnati type u funkciji logout() koji ce ici do reducera
//put ce na kraju kraju dispatchati novu akciju
import * as actionTypes from "../actions/actionTypes";
export function* logoutSaga(action) {
  debugger; //pozvat ce se iz authSagas.js iz logout()
  yield localStorage.removeItem("userId"); //U action generatorima svaki step nam treba biti prefixed sa yield keyword
  yield localStorage.removeItem("token"); // yielld je garancija da kod nece nastaviti dalje dok se prethodni ne zavrsi
  yield localStorage.removeItem("expirationDate");
  yield put({
    //put ce na kraju kraju dispatchati novu akciju
    type: actionTypes.AUTH_LOGOUT,
  });
}
//sada trebamo povezati hookati ovu SAGU sa redux storeom. Kontam da li ce ici na reducer? Msm da da

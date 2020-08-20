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
import * as actions from "../actions/authA";
export function* logoutSaga(action) {
  //3
  //debugger; //pozvat ce se iz authSagas.js iz logout()
  yield localStorage.removeItem("userId"); //U action generatorima svaki step nam treba biti prefixed sa yield keyword
  yield localStorage.removeItem("token"); // yielld je garancija da kod nece nastaviti dalje dok se prethodni ne zavrsi
  yield localStorage.removeItem("expirationDate");
  yield put(actions.logoutSucceed())
//put ce na kraju kraju dispatchati novu akciju
}

//sada trebamo povezati hookati ovu SAGU sa redux storeom. Kontam da li ce ici na reducer? Msm da da

/*
Redux-saga
It allows one to express complex logic functions as pure functions called sagas. From a testing point of
 view, pure functions are desirable because they are predictable and repeatable, making them relatively 
 easy to test. Sagas are implemented by special functions called functions of the generator. 
 These are an ES6 JavaScript new feature. Basically, everywhere you see a yield statement,
  execution jumps in and out of a generator. Think of a statement of yield as causing the generator 
  to pause and return the value of yield. The caller can then resume the generator after the yield at
   the statement.
*/

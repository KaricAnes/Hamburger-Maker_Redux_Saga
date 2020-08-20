//ovo nije bilo kada smo radili sa sinq ili asinq kodom u actionCreators.
//Akcija se primala samo u reduceru. Doduse
//Saga is kind of function -> zvjezdica funkciju pretvara u generator
//Generators are next generation JS features which can be executed incrementally tako da ih mozemo
//pozvati a da se ne ranaju from start to end immidietly
//nego mozemo pauzirati tokom function execution npr. (mozemo cekati da se asinq kod zavrsi)
//i to je upravo ono gdje redux saga takes advantage
//a ako imamo sinq kod, onda mozemo executati from start to end immidiatelly

import {put} from "redux-saga/effects"; //da bismo mogli returnati 
function* logout(action) {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
}

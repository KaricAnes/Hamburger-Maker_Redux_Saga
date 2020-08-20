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
//import * as actionTypes from "../actions/actionTypes";   ne treba otkako smo uveli u put-u logoutSucced
import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import { delay } from "redux-saga/effects";
import axios from "axios";

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      yield localStorage.getItem("expirationDate")
    ); //newDate iz stringa u date objekat ga konvertuje

    if (expirationDate <= new Date()) {
      yield put(actio) (logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

export function* checkAuthTimoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout()); //ako ti pise logoutSucceed() umjesto logout() neces doci do logoutSage koja brise localStorage
}

export function* logoutSaga(action) {
  //3
  //debugger; //pozvat ce se iz authA.js iz logout()
  yield localStorage.removeItem("userId"); //U action generatorima svaki step nam treba biti prefixed sa yield keyword
  yield localStorage.removeItem("token"); // yielld je garancija da kod nece nastaviti dalje dok se prethodni ne zavrsi
  yield localStorage.removeItem("expirationDate");
  yield put(actions.logoutSucceed()); //{ type: actionTypes.AUTH_LOGOUT --> da ne moramo importovati actiontypes ovdje
}

export function* authSaga(action) {
  //kada kliknemo na submit Button u Auth.js treba da se izvrsi
  //isSignUp upravlja na koji url cemo posalti podatke SIGNin ili SIGNup
  //ako nam firebase vrati token, mi smo autentifikovani
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true, //evo kako dobije token. Token is JS object (JSON WEB TOKEN). Obicno ga storamo u Local Storage u browser. Mozemo ga STORATI i u Redux, ali ce biti igubljen nakon svakog refrsha.
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s";
  //signup
  if (!action.isSignUp) {
    //defaultno true
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s";
    //signIn
  }
  try {
    const response = yield axios.post(url, authData); //post prima dva argumenta, gdje nesto saljemo i sta saljemo
    //nije nam vise potreban than, yield ce pazuirati sve dok se ne zavrsi post request
    //.then((response) => {
    console.log(response);
    /*
          response:
          data:
          email: "a.kdsddd@gmail.com"
          expiresIn: "3600"
          idToken: "eyJhbGciOiJSUzI1sBZ2FKCokl2ldXrMKOSFhW5fR4eKT5N1g"  //token
          kind: "identitytoolkit#SignupNewUserResponse"
          localId: "rVWMShbjlbcNm0eBPJBHfqOun9W2"   //userId --> generated automatically in firebase
          refreshToken: "AE0u-NdU6ABpe5hT
           */
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    ); //milisec to sec
    //yield nije bio pod moranjem jer se radi o sinq kodu, ali zbog konzistentnog prsitupa smo stavili
    yield localStorage.setItem("token", response.data.idToken); //ove podatke smo storali u local Storage zboh otpornosti na refreshe
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId); //treba nam user Id zbog authCheckState i success u njemu koji se okida

    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    ); //authR.js const authSuccess
    yield put(actions.checkAuthTimout(response.data.expiresIn)); //automatic logout(), ima u sebi tajmer. Nakon sat vremena tajmer okida logout()
  } catch (err) {
    /*
        data:
        error: {code: 400, message: "EMAIL_EXISTS"}
        */

    yield put(actions.authFailed(err.response.data.error)); //Auth.js  {this.props.error.message}
  }
}

//sada trebamo povezati hookati ovu SAGU sa redux storeom.  sagaMiddleware.run(watchAuth);

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

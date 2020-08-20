import * as actionTypes from "./actionTypes";
import axios from "axios";

//autoSignIn() ili autoLogout() -> index.js
//okida se u App.js-u u componentDidMount().
//prije nego sto pristupimo homePage ili bilo cemu provjerimo da li smo auth i ako jesmo okinemo checkAuthTimout() da nas
//odloguje tacno onda koliko nam je vremena i ostalo (expirationDate -> preostalo vrijeme)
//takodjer kada refreshujemo stranicu nece nas odlogovati ako nam expirationDate nije istekao
export const authCheckState = () => {
  return 
  /*return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate")); //newDate iz stringa u date objekat ga konvertuje

      if (expirationDate <= new Date()) {
        dispatch(logout());
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
  };*/
}; //RS

//asinq funkcija koja nakon 3600s poziva logout()
//automatic logout()
//pozivamo je u authCheckState-->(App.js automatic logout, otpornost na refreshe) i auth() actionCreatoru kada kliknemo na submit login forme (ako se uspjesno autentifikujemo)
//RS: asinq kod -> vjerovatno cemo ga zamjeniti sa Redux Sagom
export const checkAuthTimout = (expirationTime) => {
  //dispatch(checkAuthTimout(response.data.expiresIn))
  /*return (dispatch) => {
    setTimeout(() => {
      dispatch(logout()); //uvijek terba executati ove akcije pozivne
    }, expirationTime * 1000); //covert miliseconds to seconds
  };*/
  return {
    type: actionTypes.CHECK_TIMEOUT_INITIATE, //rootSaga, authSagas, logout - authA.js...
    expirationTime: expirationTime,
  };
};

//nakon sto se uspjesno logujemo, zelimo da idemo nazad na BurgerBuilder ili na Checkout.js u zavisnosti da li smo bildali prethodno nas burger
//okida se u Auth.js -u u componentDidMountu() i BurgerBuilder.js-u u porucivanjeHandler -u. ide na authR.js reducer

export const setAuthRedirectPath = (path) => {
  //burgerBuilder: purchaseHandler, Auth.js: componentDidMount()
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH, //sluzi nam da mozemo doci do reducera
    path: path, //mora se podudarati sa reducerom
  };
};

//sluzi za setanje loadinga na True i prikazivanje spinnera nakon sto kliknemo na submit auth forme
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START, //sluzi nam da mozemo doci do reducera
  };
}; //returns just action, not candidate for Redux Saga

//poziva se u auth() actionCreatoru ali i u authCheckState-u
export const authSuccess = (token, userId) => ({
  //id of a newly created order
  type: actionTypes.AUTH_SUCCESS,
  idToken: token, //mora se poklapati idToken sa reducerom, //authR.js const authSuccess
  userId: userId,
});

//
export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

//RS: sinq action creaotor. Nije bas najbolja praksa da sa localStorage-om radimo ovdje.
//RS: ovo je prvi SIDE EFFECT koji ce biti pretvoren u Sagu.
export const logout = () => {
  //1
  //poziva se iz Logout.js glupe komponente, ali i iz   (klik na Logout button -> u NavigationItems)
  //checkAuthTimout() akcije,  //automatski se okida sat vremena nakon log-inOVANJA
  //i authCheckState()--> ako nemamo token u App.js-u

  /*localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate"); */
  // debugger;
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT, //step before logging out. \ rootSaga, authsagas, logoutSucceed, reducer
  };
}; //RS candidate

export const logoutSucceed = () => {
  //debugger;
  return {
    type: actionTypes.AUTH_LOGOUT, //reducer mora prepoznati ovaj type, ovo ide direktno na reducer
  }; //ova dodatna akcija postoji zato sto je login sinq actionCreator ali sa SIDE EFFECTS
}; //inace asinq actionCreatori nemaju svoju dodatnu akciju sa type-om

//asinq + 4 sinq-a: authStart(), authSuccess, checkAuthTimeOut, authFailed
//RS: asinq kod -> vjerovatno cemo ga zamjeniti sa Redux Sagom
export const auth = (email, password, isSignUp) => {
  //kada kliknemo na submit Button treba da se izvrsi
  //isSignUp upravlja na koji url cemo posalti podatke SIGNin ili SIGNup
  //ako nam firebase vrati token, mi smo autentifikovani
  return {
    type: actionTypes.AUTH_INITIATE,
    email,
    password,
    isSignUp,
  };
};

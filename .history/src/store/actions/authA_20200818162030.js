import * as actionTypes from "./actionTypes";
import axios from "axios";

//okida se u App.js-u u componentDidMount().
//prije nego sto pristupimo homePage ili bilo cemu provjerimo da li smo auth i ako jesmo okinemo checkAuthTimout() da nas
//odloguje tacno onda koliko nam je vremena i ostalo (expirationDate -> preostalo vrijeme)
//takodjer kada refreshujemo stranicu nece nas odlogovati ako nam expirationDate nije istekao
export const authCheckState = () => {
  return (dispatch) => {
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
  };
}; //RS

//asinq funkcija koja nakon 3600s poziva logout()
//automatic logout()
//pozivamo je u authCheckState-->(App.js automatic logout) i auth() actionCreatoru kada kliknemo na submit login forme (ako se uspjesno autentifikujemo)
//RS: asinq kod -> vjerovatno cemo ga zamjeniti sa Redux Sagom
export const checkAuthTimout = (expirationTime) => {
  //dispatch(checkAuthTimout(response.data.expiresIn))
  /*return (dispatch) => {
    setTimeout(() => {
      dispatch(logout()); //uvijek terba executati ove akcije pozivne
    }, expirationTime * 1000); //covert miliseconds to seconds
  };*/
  return {
    type: actionTypes.CHECK_TIMEOUT_INITIATE,
    expirationTime: 
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
  debugger;
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT, //step before logging out
  };
}; //RS candidate

export const logoutSucceed = () => {
  debugger;
  return {
    type: actionTypes.AUTH_LOGOUT, //reducer mora prepoznati ovaj type
  };
};

//asinq + 4 sinq-a: authStart(), authSuccess, checkAuthTimeOut, authFailed
//RS: asinq kod -> vjerovatno cemo ga zamjeniti sa Redux Sagom
export const auth = (email, password, isSignUp) => {
  //kada kliknemo na submit Button treba da se izvrsi
  //isSignUp upravlja na koji url cemo posalti podatke SIGNin ili SIGNup
  //ako nam firebase vrati token, mi smo autentifikovani
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true, //evo kako dobije token. Token is JS object (JSON WEB TOKEN). Obicno ga storamo u Local Storage u browser. Mozemo ga STORATI i u Redux, ali ce biti igubljen nakon svakog refrsha.
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s";
    //signup
    if (!isSignUp) {
      //defaultno true
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s";
      //signIn
    }
    axios
      .post(url, authData) //post prima dva argumenta, gdje nesto saljemo i sta saljemo
      .then((response) => {
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
        //debugger;

        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); //milisec to sec
        localStorage.setItem("token", response.data.idToken); //ove podatke smo storali u local Storage zboh otpornosti na refreshe
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId); //treba nam user Id zbog authCheckState i success u njemu koji se okida

        dispatch(authSuccess(response.data.idToken, response.data.localId)); //authR.js const authSuccess
        dispatch(checkAuthTimout(response.data.expiresIn)); //automatic logout(), ima u sebi tajmer. Nakon sat vremena tajmer okida logout()
      })
      .catch((err) => {
        console.log("error authA");
        /*
        data:
        error: {code: 400, message: "EMAIL_EXISTS"}
        */

        dispatch(authFailed(err.response.data.error)); //Auth.js  {this.props.error.message}
        //debugger;
      });
  };
}; //RS

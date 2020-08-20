import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility"; //sluzi nam za updajtovanje old-state-a

const initialState = {
  token: null, //idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzZTllYThmNzNkZWExMTRkZWI5YTY0OTcx  authA.js response.data
  userId: null, //localId: "La3z501q7MS6rlZ0BZCSit3I4ui1"
  error: null, //authFail action
  loading: false,
  authRedirectPath: "/", //on odlucuje gdje cemo nakon uspjesno auth-a: na BB ili na Checkout.js
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
  //updateObjecktu prosljedjujem oldState, i dio state koji zelim da updajtujem
  //ono sto je zanimljivo je da updateObject() nece uduplati npr. loading nego ce overridati isti
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken, //idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzZTllYThmNzNkZWExMTRkZWI5YTY0OTcx  authA.js response.data
    userId: action.userId, //localId: "La3z501q7MS6rlZ0BZCSit3I4ui1"
    error: null,
    loading: false, //because we are done
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error, //{code:400,message:'EMAIL_EXIST…nvalid'}]}
    loading: false,
  });
};

//nakon sat vremena token ce opet biti null i userId
const authLogout = (state, action) => {
  debugger;
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      /*newPArt */ return authStart(state, action);
    // return updateObject(state, {error: null, loading:true});      //utility

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      //debugger; dokaz da jedna akcija ide na sve reducere
      return state;
  }
};

export default reducer;

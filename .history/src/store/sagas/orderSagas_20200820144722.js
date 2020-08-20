import { put } from "redux-saga/effects"; //da bismo mogli returnati type u funkciji logout() koji ce ici do reducera
//put ce na kraju kraju dispatchati novu akciju
//import * as actionTypes from "../actions/actionTypes";   ne treba otkako smo uveli u put-u logoutSucced
import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import { delay } from "redux-saga/effects";
import axios from "axios";
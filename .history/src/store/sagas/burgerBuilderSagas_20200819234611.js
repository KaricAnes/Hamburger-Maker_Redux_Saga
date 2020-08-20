import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import axios from "axios";

export function* (action){
    try {
        const response = yield axios.post(url, authData);
}
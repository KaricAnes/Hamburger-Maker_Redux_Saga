import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import axios from "axios";

export function* (action){
    try {
        const response = yield axios.get("https://react-moj-hamburger.firebaseio.com/ingredients.json");
        yield put(actions.s(response.data));
    }
}
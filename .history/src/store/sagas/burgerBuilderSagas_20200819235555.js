import * as actions from "../actions/index"; //mjesto gdje imamo sve akcije na jednom mjestu
import axios from "axios";
import { put } from "redux-saga/effects";

export function* fetchIngredients (action){
    try {
        const response = yield axios.get("https://react-moj-hamburger.firebaseio.com/ingredients.json");
        yield put(actions.setIngredients(response.data));
    } catch (err) {
        
    
        yield put(actions.setIngredientsFailed()); //Auth.js  {this.props.error.message}
      }
}
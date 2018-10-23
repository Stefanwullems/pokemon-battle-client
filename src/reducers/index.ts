import { combineReducers } from "redux";
import pokemon1 from "./pokemon1";
import pokemon2 from "./pokemon2";
import turn from "./turn";

import games from './games'

export default combineReducers({ pokemon1,
     pokemon2, 
     turn, 
     games });

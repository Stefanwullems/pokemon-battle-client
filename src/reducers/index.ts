import { combineReducers } from "redux";
//import pokemon1 from "./playerCurrentPokemon";
//import pokemon2 from "./opponentCurrentPokemon";
import playerParty from "./playerParty";
import opponentParty from "./opponentParty";
import turn from "./turn";

export default combineReducers({ playerParty, opponentParty, turn });

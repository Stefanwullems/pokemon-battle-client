import { combineReducers } from "redux";
import playerPokemon from "./playerPokemon";
import opponentPokemon from "./opponentPokemon";
import playerParty from "./playerParty";
import opponentParty from "./opponentParty";
import turn from "./turn";
import games from './games'

export default combineReducers({
  playerParty,
  opponentParty,
  turn,
  playerPokemon,
  opponentPokemon,
  games
});


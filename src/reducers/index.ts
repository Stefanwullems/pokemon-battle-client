import { combineReducers } from "redux";
import playerPokemon from "./playerPokemon";
import opponentPokemon from "./opponentPokemon";
import playerParty from "./playerParty";
import opponentParty from "./opponentParty";
import turnIndex from "./turnIndex";
import trainer from "./trainer";
import games from "./games";
import playerMove from "./playerMove";
import opponentMove from "./opponentMove";
import types from "./types";
import log from "./log";
import playerPartyIds from "./playerPartyIds";
export default combineReducers({
  playerParty,
  opponentParty,
  turnIndex,
  playerPokemon,
  opponentPokemon,
  games,
  trainer,
  playerMove,
  opponentMove,
  types,
  log,
  playerPartyIds
});

import * as request from "superagent";
export const ADD_GAME = "ADD_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const UPDATE_GAMES = "UPDATE_GAMES";
export const JOIN_GAME_SUCCESS = "JOIN_GAME_SUCCESS";
export const UPDATE_GAME_SUCCESS = "UPDATE_GAME_SUCCESS";

const baseUrl = "http://localhost:3000/";

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
});

const addGame = game => ({
  type: ADD_GAME,
  payload: game
});

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
});

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
});

export const getGames = () => dispatch => {
  request
    .get(`${baseUrl}/games`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err));
};

export const joinGame = gameId => dispatch => {
  request
    .post(`${baseUrl}/games/${gameId}/trainers`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err));
};

export const createGame = () => (dispatch, getState) => {
  request
    .post(`${baseUrl}/games`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err));
};
export const updateGame = (gameId, battleGround) => dispatch => {
  request
    .patch(`${baseUrl}/games/${gameId}`)
    .send({ battleGround })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err));
};

import ApolloClient, { gql } from "apollo-boost";
export const ADD_GAME = 'ADD_GAME'
export const GAMES_FETCHED = 'GAMES_FETCHED'

export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const GAME_HOSTED = 'GAME_HOSTED'

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

// const updateGames = games => ({
//   type: UPDATE_GAMES,
//   payload: games
// })

// const addGame = game => ({
//   type: ADD_GAME,
//   payload: game
// })

// const updateGameSuccess = () => ({
//   type: UPDATE_GAME_SUCCESS
// })

// const joinGameSuccess = () => ({
//   type: JOIN_GAME_SUCCESS
// })


export  function fetchGames(){
  return function(dispatch) {
    console.log("fetching...")
    client
      .query({
        query: gql`
        {
          allGames{
            id
            status
            playerone
            playertwo
            }
          }
      `
      })
      .then((res:any) => {
        console.log("fetched!")
        dispatch({
          type: GAMES_FETCHED,
          payload: res.data.allGames
        });
      });
}
}

export const hostGame = (id) => {
  return function(dispatch){
    client
    .mutate({
      mutation: gql`
        mutation {
           changeStatus(id: ${id})
           {
          status
        }
        }
      `
    })
    .then((res:any) => {
      console.log("fetched update!")
      console.log(res.data.changeStatus)
      dispatch({
        type: GAME_HOSTED,
        payload: res.data.allGames
      });
  })
}
}


export const joinGame = (id) => {
  return function(dispatch){
    client
    .mutate({
      mutation: gql `
        { changeStatus2(id:${id})
        {
          id 
        }
        }
      `
    })
    .then((res:any) => {
      console.log("fetched last update of status!")
      dispatch({
        type: GAMES_FETCHED,
        payload: res.data.allGames
      });
  })
}
}

export const getGames = () => {
  
}
export const createGame = () => {
  
}
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const POKEMON1_FETCHED = "POKEMON1_FETCHED";
export const POKEMON2_FETCHED = "POKEMON2_FETCHED";

export function fetchPokemon(id1: number, id2: number) {
  return function(dispatch) {
    client
      .query({
        query: gql`
          {
            pokemon(id: ${id1})
          }
        `
      })
      .then((res: any) => {
        dispatch({
          type: POKEMON1_FETCHED,
          payload: res.data.pokemon
        });
      });
    client
      .query({
        query: gql`
          {
            pokemon(id: ${id2})
          }
        `
      })
      .then((res: any) => {
        dispatch({
          type: POKEMON2_FETCHED,
          payload: res.data.pokemon
        });
      });
  };
}

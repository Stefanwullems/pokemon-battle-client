import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const POKEMON1_FETCHED = "POKEMON1_FETCHED";
export const POKEMON2_FETCHED = "POKEMON2_FETCHED";

export default function(id1: number, id2: number) {
  return function(dispatch) {
    client
      .query({
        query: gql`
          {
            pokemon(id: ${id1}){
              name
            }
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
            pokemon(id: ${id2}){
              name
            }
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

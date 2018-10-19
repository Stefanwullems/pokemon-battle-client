import ApolloClient, { gql } from "apollo-boost";
import { POKEMON1_FETCHED } from "../../reducers/pokemon1";
import { POKEMON2_FETCHED } from "../../reducers/pokemon2";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export default function(id1: number, id2: number) {
  return function(dispatch) {
    client

      .query({
        query: gql`
        {
          pokemon(id: ${id1}) {
            name
            hp
            attack
            def
            spd
            moves{
              name
            }
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
          pokemon(id: ${id2}) {
            name
            hp
            attack
            def
            spd
            moves{
              name
            }

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




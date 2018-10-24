import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const FETCHED_TYPES = "FETCHED_TYPES";

export default function() {
  return async function(dispatch) {
    const types = await getTypes();
    dispatch({
      type: FETCHED_TYPES,
      payload: types
    });
  };
}

async function getTypes() {
  const res = await queryForTypes();
  const types = res.data["types"];

  return types.reduce((acc, curr) => {
    const { name, ...multipliers } = curr;
    acc[name] = multipliers;
    return acc;
  }, {});
}

function queryForTypes() {
  return client.query({
    query: gql`
      {
        types {
          name
          normal_multiplier
          fire_multiplier
          water_multiplier
          electric_multiplier
          grass_multiplier
          ice_multiplier
          fighting_multiplier
          poison_multiplier
          ground_multiplier
          flying_multiplier
          psychic_multiplier
          bug_multiplier
          rock_multiplier
          ghost_multiplier
          dragon_multiplier
          dark_multiplier
          steel_multiplier
          fairy_multiplier
        }
      }
    `
  });
}

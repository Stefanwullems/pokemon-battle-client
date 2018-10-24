import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const FETCHED_TYPES = "FETCHED_TYPES";

export default function() {
  return async function(dispatch) {
    dispatch({
      type: FETCHED_TYPES,
      payload: await getTypes()
    });
  };
}

async function getTypes() {
  const res = await queryForTypes();
  return res.data["types"].reduce((acc, curr) => {
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

import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const SET_PLAYER_PARTY = "SET_PLAYER_PARTY";
export const SET_OPPONENT_PARTY = "SET_OPPONENT_PARTY";

export default function(playerPartyIds: number[], opponentPartyIds: number[]) {
  return async function(dispatch) {
    const playerParty = await mapPokemonToId(playerPartyIds);

    dispatch({
      type: SET_PLAYER_PARTY,
      payload: playerParty
    });
    const opponentParty = await mapPokemonToId(opponentPartyIds);
    dispatch({
      type: SET_OPPONENT_PARTY,
      payload: opponentParty
    });
  };
}

async function mapPokemonToId(partyIds: number[]) {
  const party: any[] = [];
  for (let i = 0; i < partyIds.length; i++) {
    await queryForPokemon(partyIds[i]).then((res: any) =>
      party.push(res.data.pokemon)
    );
  }
  return party;
}

function queryForPokemon(id) {
  return client.query({
    query: gql`
        {
          pokemon(id: ${id}) {
            name
            id
            types{
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
            stats{
              hp
              attack
              defense
              speed
            }
            moves{
              name
              damage
              accuracy
              type
              pp
              priority
            }
          }
        }
      `
  });
}

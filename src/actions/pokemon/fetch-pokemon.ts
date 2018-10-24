import { IFetchPokemonParams, IPokemon } from "../../tools/interfaces";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4011/graphql"
});

export const SET_PLAYER_PARTY = "SET_PLAYER_PARTY";
export const SET_OPPONENT_PARTY = "SET_OPPONENT_PARTY";

export default function({
  playerPartyIds,
  opponentPartyIds
}: IFetchPokemonParams) {
  return async function(dispatch) {
    dispatch(
      await dispatchParty({ partyIds: playerPartyIds, trainer: "PLAYER" })
    );
    dispatch(
      await dispatchParty({ partyIds: opponentPartyIds, trainer: "OPPONENT" })
    );
  };
}

async function dispatchParty({ partyIds, trainer }) {
  return {
    type: `SET_${trainer}_PARTY`,
    payload: await constructParty(partyIds)
  };
}

async function constructParty(partyIds) {
  const party: IPokemon[] = [];
  for (let i = 0; i < partyIds.length; i++) {
    await queryForPokemon(partyIds[i]).then((res: any) => {
      const pokemon: IPokemon = res.data.pokemon;
      pokemon.status = "fit";
      party.push(pokemon);
    });
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
            primaryType
            secondaryType
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

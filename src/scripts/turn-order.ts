import { ITurnOrderParams, ITurnOrder, IMove } from "../tools/interfaces";

export default function({
  playerPokemon,
  opponentPokemon,
  playerMoveName,
  opponentMoveName
}: ITurnOrderParams): ITurnOrder | undefined {
  if (playerMoveName === "pass") return ["player", "opponent"];
  if (opponentMoveName === "pass") return ["opponent", "player"];

  const playerMove: IMove = getMove({
    pokemon: playerPokemon,
    moveName: playerMoveName
  });
  const opponentMove: IMove = getMove({
    pokemon: opponentPokemon,
    moveName: opponentMoveName
  });

  console.log('playerMove = ', playerMove)
  console.log('opponentMove = ', opponentMove)
  if (playerMove.priority === opponentMove.priority) {
    if (playerPokemon.stats.speed > opponentPokemon.stats.speed) {
      return ["player", "opponent"];
    } else if (playerPokemon.stats.speed < opponentPokemon.stats.speed) {
      return ["opponent", "player"];
    }
  } else if (playerMove.priority) return ["player", "opponent"];
  else return ["opponent", "player"];
}

function getMove({ pokemon, moveName }) {
  return pokemon.moves.filter(move => move.name === moveName)[0];
}

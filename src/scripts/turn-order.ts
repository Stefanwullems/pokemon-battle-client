import { ITurnOrderOptions, ITurnOrder } from "../tools/interfaces";

export default function({
  playerPokemon,
  opponentPokemon,
  playerMoveName,
  opponentMoveName
}: ITurnOrderOptions): ITurnOrder | undefined {
  if (playerMoveName === "pass") return ["player", "opponent"];
  if (opponentMoveName === "pass") return ["opponent", "player"];
  const playerMove = playerPokemon.moves.filter(
    move => move.name === playerMoveName
  )[0];
  const opponentMove = opponentPokemon.moves.filter(
    move => move.name === opponentMoveName
  )[0];
  if (playerMove.priority === opponentMove.priority) {
    if (playerPokemon.stats.speed > opponentPokemon.stats.speed) {
      return ["player", "opponent"];
    } else if (playerPokemon.stats.speed < opponentPokemon.stats.speed) {
      return ["opponent", "player"];
    }
  } else if (playerMove.priority) {
    return ["player", "opponent"];
  } else {
    return ["opponent", "player"];
  }
}

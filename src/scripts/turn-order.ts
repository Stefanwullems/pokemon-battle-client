import { ITurnOrderOptions, ITurnOrder } from "../tools/interfaces";

export default function({
  playerPokemon,
  opponentPokemon,
  playerMove,
  opponentMove
}: ITurnOrderOptions): ITurnOrder | undefined {
  if (
    !(playerMove && opponentMove) ||
    playerMove.priority === opponentMove.priority
  ) {
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

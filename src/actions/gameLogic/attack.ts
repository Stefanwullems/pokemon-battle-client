import { IAttack, IPokemon } from "../../tools/interfaces";

export const PLAYER_GOT_ATTACKED = "PLAYER_GOT_ATTACKED";
export const OPPONENT_GOT_ATTACKED = "OPPONENT_GOT_ATTACKED";
export const PLAYER_POKEMON_FAINTED = "PLAYER_POKEMON_FAINTED";
export const OPPONENT_POKEMON_FAINTED = "OPPONENT_POKEMON_FAINTED";
export const PLAYER_SWITCHED_OUT = "PLAYER_SWITCHED_OUT";
export const OPPONENT_SWITCHED_OUT = "OPPONENT_SWITCHED_OUT";

export default function({ attacker, defender, moveName, turn }: IAttack) {
  if (moveName !== "pass") {
    const move = attacker.moves.filter(move => move.name === moveName)[0];
    const newDefender: IPokemon = JSON.parse(JSON.stringify(defender));
    const damage =
      (attacker.stats.attack / defender.stats.defense) * move.damage * 0.2;

    newDefender.stats.hp -= damage;

    if (newDefender.stats.hp <= 0) {
      newDefender.status = "fainted";
      return {
        type:
          turn === "opponent"
            ? PLAYER_POKEMON_FAINTED
            : OPPONENT_POKEMON_FAINTED,
        payload: newDefender
      };
    } else {
      return {
        type: turn === "opponent" ? PLAYER_GOT_ATTACKED : OPPONENT_GOT_ATTACKED,
        payload: newDefender
      };
    }
  } else {
    return {
      type: turn === "player" ? PLAYER_SWITCHED_OUT : OPPONENT_SWITCHED_OUT
    };
  }
}

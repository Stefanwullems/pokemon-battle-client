import { IAttackParams, IPokemon } from "../../tools/interfaces";

export const PLAYER_GOT_ATTACKED = "PLAYER_GOT_ATTACKED";
export const OPPONENT_GOT_ATTACKED = "OPPONENT_GOT_ATTACKED";
export const PLAYER_POKEMON_FAINTED = "PLAYER_POKEMON_FAINTED";
export const OPPONENT_POKEMON_FAINTED = "OPPONENT_POKEMON_FAINTED";
export const PLAYER_SWITCHED_OUT = "PLAYER_SWITCHED_OUT";
export const OPPONENT_SWITCHED_OUT = "OPPONENT_SWITCHED_OUT";

export default function({
  attacker,
  defender,
  moveName,
  turn,
  types
}: IAttackParams) {
  const trainer = turn.toUpperCase();
  if (moveName !== "pass" && attacker.stats.hp > 0) {
    const move = attacker.moves.filter(move => move.name === moveName)[0];
    const newDefender: IPokemon = JSON.parse(JSON.stringify(defender));

    if (Math.floor(Math.random() * 101) <= move.accuracy) {
      const typeMultiplier =
        types[defender.primaryType][`${move.type}_multiplier`] *
        types[defender.secondaryType][`${move.type}_multiplier`];

      const damage =
        (attacker.stats.attack / defender.stats.defense) *
        move.damage *
        0.2 *
        typeMultiplier;

      console.log(
        attacker.name,
        "did",
        damage,
        "damage to",
        defender.name,
        "with the move",
        move.name,
        "it was",
        typeMultiplier === 1
          ? "normally"
          : typeMultiplier > 1
            ? "super"
            : "not very",
        "effective"
      );

      newDefender.stats.hp -= damage;

      if (newDefender.stats.hp <= 0) {
        newDefender.status = "fainted";
        return {
          type:
            trainer === "PLAYER"
              ? OPPONENT_POKEMON_FAINTED
              : PLAYER_POKEMON_FAINTED,
          payload: newDefender
        };
      } else {
        return {
          type:
            trainer === "PLAYER" ? OPPONENT_GOT_ATTACKED : PLAYER_GOT_ATTACKED,
          payload: newDefender
        };
      }
    } else {
      return {
        type: `${trainer}_MISSED`
      };
    }
  } else {
    return {
      type: `${trainer}_SWITCHED_OUT`
    };
  }
}

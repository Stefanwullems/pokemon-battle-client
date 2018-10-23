import { IAttack, IPokemon } from "../../tools/interfaces";

export const PLAYER_GOT_ATTACKED = "PLAYER_GOT_ATTACKED";
export const OPPONENT_GOT_ATTACKED = "OPPONENT_GOT_ATTACKED";

export default function({ attacker, defender, move, turn }: IAttack) {
  console.log(move);
  const newDefender: IPokemon = JSON.parse(JSON.stringify(defender));
  const damage =
    (attacker.stats.attack / defender.stats.defense) * move.damage * 0.2;

  newDefender.stats.hp -= damage;

  return {
    type: turn === "opponent" ? PLAYER_GOT_ATTACKED : OPPONENT_GOT_ATTACKED,
    payload: newDefender
  };
}

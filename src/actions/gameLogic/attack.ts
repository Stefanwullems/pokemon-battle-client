export const PLAYER_GOT_ATTACKED = "PLAYER_GOT_ATTACKED";
export const OPPONENT_GOT_ATTACKED = "OPPONENT_GOT_ATTACKED";

export default function(attacker, defender, move, turn) {
  const damage = (attacker.attack / defender.defense) * move.damage * 0.06;
  const newDefender = { ...defender };
  newDefender.hp -= damage;
  if (turn === "opponent") {
    return {
      type: PLAYER_GOT_ATTACKED,
      payload: newDefender
    };
  } else if (turn === "player") {
    return {
      type: OPPONENT_GOT_ATTACKED,
      payload: newDefender
    };
  }
}

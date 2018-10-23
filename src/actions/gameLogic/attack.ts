export const PLAYER_ATTACKED = "PLAYER_ATTACKED";
export const OPPONENT_ATTACKED = "OPPONENT_ATTACKED";

export function attack(attacker, defender, move, turn) {
  const damage = (attacker.attack / defender.defense) * move.damage * 0.06;
  const newDefender = { ...defender };
  newDefender.hp -= damage;
  if (turn === "player") {
    return {
      type: PLAYER_ATTACKED,
      payload: newDefender
    };
  } else if (turn === "opponent") {
    return {
      type: OPPONENT_ATTACKED,
      payload: newDefender
    };
  }
}

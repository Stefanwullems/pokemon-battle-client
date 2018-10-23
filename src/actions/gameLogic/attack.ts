export const PLAYER_GOT_ATTACKED = "PLAYER_GOT_ATTACKED";
export const OPPONENT_GOT_ATTACKED = "OPPONENT_GOT_ATTACKED";

export default function(attacker, defender, move, turn) {
  const damage =
    (attacker.stats.attack / defender.stats.defense) * move.damage * 0.06;
  console.log(damage);
  const newDefender = { ...defender };
  console.log("1", newDefender.stats.hp);
  newDefender.stats.hp = newDefender.stats.hp - damage;
  console.log("2", newDefender.stats.hp);
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

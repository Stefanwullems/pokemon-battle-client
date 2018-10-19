export const ATTACKED1 = 'ATTACKED1';
export const ATTACKED2 = 'ATTACKED2';

export const attack = (attacker, defender, moveId, turn) => {
  if ((turn = 0)) {
    const damage = (attacker.atk / defender.def) * moveId.dmg * 0.06;
    let newDefender = { ...defender };
    newDefender.hp -= damage;

    return {
      type: ATTACKED1,
      payload: newDefender
    };
  } else if ((turn = 1)) {
    const damage = (attacker.atk / defender.def) * moveId.dmg * 0.06;
    let newDefender = { ...defender };
    newDefender.hp -= damage;
    
    return {
      type: ATTACKED2,
      payload: newDefender
    };
  }
};

import * as React from "react";

import doesExist from "../../scripts/does-exist";
import { IPokemon } from "../../tools/interfaces";

interface IProps {
  toggleShowSwitchOut: () => void;
  playerParty: IPokemon[];
  showSwitchOut: boolean;
  playerPokemon: IPokemon;
  onSelectButtonClick: () => void;
}

function SelectPokemonPanel(props: IProps) {
  return (
    <React.Fragment>
      <button onClick={props.toggleShowSwitchOut}>Switch Out</button>
      {doesExist(props.playerParty) &&
        props.showSwitchOut &&
        props.playerParty.map(pokemon => {
          return (
            <div key={pokemon.name}>
              <span>
                {pokemon.name} [hp: {pokemon.stats.hp}]
              </span>
              {pokemon.name !== props.playerPokemon.name &&
                pokemon.stats.hp > 0 && (
                  <button
                    onClick={props.onSelectButtonClick}
                    name={pokemon.id.toString()}
                  >
                    select
                  </button>
                )}
              {pokemon.name !== props.playerPokemon.name &&
                pokemon.stats.hp <= 0 && <strong>fainted</strong>}
              {pokemon.name === props.playerPokemon.name && (
                <strong>selected</strong>
              )}
            </div>
          );
        })}
    </React.Fragment>
  );
}

export default SelectPokemonPanel;

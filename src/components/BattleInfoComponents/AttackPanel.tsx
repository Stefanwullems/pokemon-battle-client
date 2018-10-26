import * as React from "react";

import doesExist from "../../scripts/does-exist";
import { IPokemon } from "../../tools/interfaces";

interface IProps {
  logging: boolean;
  toggleShowMoves: () => void;
  showMoves: boolean;
  playerPokemon: IPokemon;
  onMoveButtonClick: (e) => void;
}

function AttackPanel(props: IProps) {
  return (
    <React.Fragment>
      {!props.logging && (
        <React.Fragment>
          <button onClick={props.toggleShowMoves}>attack</button>

          {props.showMoves &&
            !props.logging && (
              <div>
                <div>
                  {doesExist(props.playerPokemon) &&
                    props.playerPokemon.moves.map(move => {
                      return (
                        <div key={move.name}>
                          <button
                            onClick={props.onMoveButtonClick}
                            name={move.name}
                            className="player"
                          >
                            {move.name}
                          </button>
                          <span>
                            {"  "}
                            type: {move.type}, dmg: {move.damage}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AttackPanel;
